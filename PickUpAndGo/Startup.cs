using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using PickUpAndGo.Auth;
using PickUpAndGo.Persistence.Context;

namespace PickUpAndGo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string customOriginPolicy = "_myAllowSpecificOrigins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Map appsettings.json to AppSettings class
            var config = Configuration.Get<AppSettings>();
            services.Configure<AppSettings>(Configuration);
            services.AddCors(options =>
            {
                options.AddPolicy(customOriginPolicy,
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                    });
            });
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo()
                {
                    Title = "ŁapuCapu API",
                    Version = "v1",
                    Contact = new OpenApiContact()
                    {
                        Name = "ŁapuCapu Team",
                        Email = "f.madej@protonmail.com"
                    }
                });
                x.AddSecurityDefinition("Json Web Token", new OpenApiSecurityScheme()
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter JWT token with Bearer in field below.",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                x.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference()
                            {
                                Id = "Json Web Token",
                                Type = ReferenceType.SecurityScheme
                            }
                        },
                        new List<string>()
                    }
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                x.IncludeXmlComments(xmlPath);
            });

            // Configure Auto-mapper
            var mappingConfig = new MapperConfiguration(configure =>
            {
                configure.AddProfile(new AppMappingProfile());
            });

            var mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            // Configure jwt handler
            IJwtHandler jwtHandler = new JwtHandler(Options.Create(config.Jwt));

            services.AddHttpContextAccessor();
            services.AddSingleton<IJwtHandler, JwtHandler>(x => (JwtHandler) jwtHandler);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = jwtHandler.Parameters;
                options.Validate();
            });

            // Configure database
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(config.ConnectionStrings.Database));
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(customOriginPolicy);
            try
            {
                using var serviceScope = app.ApplicationServices.CreateScope();
                var dbContext = serviceScope.ServiceProvider.GetService<AppDbContext>();
                Console.WriteLine("Trying to update database...");
                dbContext.Database.Migrate();
                Console.WriteLine("Successfully updated database!");
            }
            catch (Exception e)
            {
                Console.WriteLine("When trying to setup database...");
                Console.WriteLine(e);
                throw;
            }

            app.UseSwagger();
            app.UseSwaggerUI(x =>
            {
                x.SwaggerEndpoint("/swagger/v1/swagger.json", "PickUpAndGo API v1");
                x.RoutePrefix = string.Empty;
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}