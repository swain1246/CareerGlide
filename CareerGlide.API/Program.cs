using System.Text;
using CareerGlide.API.Configuration;
using CareerGlide.API.Entity;
using CareerGlide.API.Middlewares;
using CareerGlide.API.Repositories;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Load Configuration
        var configuration = builder.Configuration;

        // Add Services to the Container
        ConfigureServices(builder.Services, configuration);
        builder.Services.Configure<EmailConfig>(builder.Configuration.GetSection("EmailConfig"));
        var app = builder.Build();

        // Configure Middleware
        ConfigureMiddleware(app);
        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {

        // Load JWT settings from appsettings.json
        var jwtSettings = new JwtSettings();
        configuration.GetSection("Jwt").Bind(jwtSettings);
        services.AddSingleton(jwtSettings);

        // Add services to the container.
        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();


        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.WithOrigins("http://localhost:3000",
                                    "https://careerglide-ui.onrender.com") 
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials()
                      .SetIsOriginAllowedToAllowWildcardSubdomains(); // Add this
            });
        });


        // ?? Add Session & Cache
        services.AddDistributedMemoryCache();

        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromHours(1);
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });


        // Register Dependencies
        services.AddScoped<GenericRepository>();
        services.AddScoped<SendEmailAPIService>();
        services.AddScoped<UserService>();
        services.AddScoped<AccountService>();
        services.AddScoped<StudentProfileService>();
        services.AddScoped<CompanyActivityService>();
        services.AddScoped<StudentActivityService>();
        services.AddScoped<MentorActivityService>();
        services.AddScoped<CommonService>();
        services.AddScoped<MentorProfileService>();
        services.AddScoped<AdminActivityService>();


        // JWT Authentication
        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

    }
    private static void ConfigureMiddleware(WebApplication app)
    {
        //if (app.Environment.IsDevelopment())
        //{
        //    app.UseSwagger();
        //    app.UseSwaggerUI();
        //}

        app.UseSwagger();
        app.UseSwaggerUI( c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "CareerGlide Api");
            c.RoutePrefix = "swagger";
        });

        if (!app.Environment.IsDevelopment())
        {
            app.UseHttpsRedirection();
        }
        // ?? Apply CORS before auth
        app.UseCors("AllowAll");

        app.UseSession();

        app.UseMiddleware<JwtCookieToHeaderMiddleware>();

        app.UseAuthentication();
        app.UseAuthorization();
        // ?? Register the ChatHub endpoint
        app.MapControllers();
    }
}