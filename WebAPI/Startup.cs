using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Services;
using static WebAPI.Models.OrderDBSetting;
using static WebAPI.Models.ProductDBSetting;
using static WebAPI.Models.UserCartDBSetting;
using static WebAPI.Models.UserDBSetting;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add product database
            services.AddSingleton<ProductDbClient>();

            services.Configure<ProductListDBSetting>(
                Configuration.GetSection(nameof(ProductListDBSetting)));
            services.AddSingleton<IProductListDBSetting>(sp =>
                sp.GetRequiredService<IOptions<ProductListDBSetting>>().Value);
            services.AddSingleton<ProductService>();
            //

            //Add user database
            services.Configure<UserListDBSetting>(
                Configuration.GetSection(nameof(UserListDBSetting)));

            services.AddSingleton<IUserListDBSetting>(sp =>
                sp.GetRequiredService<IOptions<UserListDBSetting>>().Value);

            services.AddSingleton<AuthService>();
            //

            //Add user cart database
            services.Configure<UserCartListDBSetting>(
                Configuration.GetSection(nameof(UserCartListDBSetting)));

            services.AddSingleton<IUserCartListDBSetting>(sp =>
                sp.GetRequiredService<IOptions<UserCartListDBSetting>>().Value);

            services.AddSingleton<UserCartService>();
            //

            //Add order database
            services.Configure<OrderListDBSetting>(
                Configuration.GetSection(nameof(OrderListDBSetting)));

            services.AddSingleton<IOrderListDBSetting>(sp =>
                sp.GetRequiredService<IOptions<OrderListDBSetting>>().Value);

            services.AddSingleton<OrderService>();
            //

            //Code for authentication middleware start here
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = "https://localhost:5001",
                        ValidAudience = "https://localhost:5001",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                    };
                });
            //Code for authentication middleware ends here

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }
            app.UseCors("EnableCORS");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
