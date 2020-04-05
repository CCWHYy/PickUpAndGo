﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PickUpAndGo.Auth.Models;

namespace PickUpAndGo.Auth
{
    public interface IJwtHandler
    {
        UserJwtModel Create(string userId, string role, string storeId);
        TokenValidationParameters Parameters { get; }
    }

    public class JwtHandler : IJwtHandler
    {
        private readonly JwtSettings _settings;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        private SecurityKey _issuerSigningKey;
        private SigningCredentials _signingCredentials;
        private JwtHeader _jwtHeader;
        public TokenValidationParameters Parameters { get; private set; }

        public JwtHandler(IOptions<JwtSettings> settings)
        {
            _settings = settings.Value;
            if (_settings.UseRsa)
            {
                InitializeRsa();
            }
            else
            {
                InitializeHmac();
            }

            InitializeJwtParameters();
        }

        private void InitializeRsa()
        {
            RSA publicRsa = RSA.Create();

            var publicKeyXml = File.ReadAllText(_settings.RsaPublicKeyXML);
            publicRsa.FromXmlString(publicKeyXml);
            _issuerSigningKey = new RsaSecurityKey(publicRsa);


            if (string.IsNullOrWhiteSpace(_settings.RsaPrivateKeyXML))
            {
                return;
            }

            RSA privateRsa = RSA.Create();
            var privateKeyXml = File.ReadAllText(_settings.RsaPrivateKeyXML);
            privateRsa.FromXmlString(privateKeyXml);
            var privateKey = new RsaSecurityKey(privateRsa);
            _signingCredentials = new SigningCredentials(privateKey, SecurityAlgorithms.RsaSha256);
        }

        private void InitializeHmac()
        {
            _issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.HmacSecretKey));
            _signingCredentials = new SigningCredentials(_issuerSigningKey, SecurityAlgorithms.HmacSha256);
        }

        private void InitializeJwtParameters()
        {
            _jwtHeader = new JwtHeader(_signingCredentials);
            Parameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidIssuer = _settings.Issuer,
                IssuerSigningKey = _issuerSigningKey
            };
        }

        public UserJwtModel Create(string userId, string role, string storeId)
        {
            var nowUtc = DateTime.UtcNow;
            var expires = nowUtc.AddDays(_settings.ExpiryDays);
            var centuryBegin = new DateTime(1970, 1, 1);
            var exp = (long) (new TimeSpan(expires.Ticks - centuryBegin.Ticks).TotalSeconds);
            var now = (long) (new TimeSpan(nowUtc.Ticks - centuryBegin.Ticks).TotalSeconds);
            var issuer = _settings.Issuer ?? string.Empty;
            var payload = new JwtPayload(claims: new List<Claim>()
            {
                new Claim(ClaimTypes.Role, role),
                new Claim("StoreId", storeId)
            })
            {
                {"sub", userId},
                {"unique_name", userId},
                {"iss", issuer},
                {"iat", now},
                {"nbf", now},
                {"exp", exp},
                {"jti", Guid.NewGuid().ToString("N")}
            };

            var jwt = new JwtSecurityToken(_jwtHeader, payload);

            var token = _jwtSecurityTokenHandler.WriteToken(jwt);

            return new UserJwtModel
            {
                Token = token,
                Expires = exp
            };
        }
    }
}