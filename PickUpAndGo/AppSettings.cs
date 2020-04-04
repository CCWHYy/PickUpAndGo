namespace PickUpAndGo
{
    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }

        /// <summary>
        /// JWT settings
        /// </summary>
        public JwtSettings Jwt { get; set; }
    }

    public class ConnectionStrings
    {
        public string Database { get; set; }
    }

    public class JwtSettings
    {
        public string HmacSecretKey { get; set; }
        public int ExpiryDays { get; set; }
        public string Issuer { get; set; }
        public bool UseRsa { get; set; }
        public string RsaPrivateKeyXML { get; set; }
        public string RsaPublicKeyXML { get; set; }
    }
}