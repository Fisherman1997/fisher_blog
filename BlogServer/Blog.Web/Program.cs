using Blog.Service.Api;
using Blog.Utils;
using Blog.Data;
using Blog.Utils.config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SqlSugar;
using Blog.Web.Filter;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<VisitStatService>();  // 注册统计服务
builder.Services.AddControllers(options =>
{
    options.Filters.Add<VisitTrackingFilter>();  // 注册全局过滤器
});

//builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

GlobalContext.systmConfig = configuration.GetSection("SystemConfig").Get<SystemConfig>();
GlobalContext.jwtConfig = configuration.GetSection("Jwt").Get<JwtConfig>();
GlobalContext.emailConfig = configuration.GetSection("Email").Get<EmailConfig>();
GlobalContext.wwwrooturl = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");



// 添加 JWT 认证服务
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = GlobalContext.jwtConfig!.Issuer,
        ValidAudience = GlobalContext.jwtConfig.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GlobalContext.jwtConfig.Key))
    };
});

// 配置Session
builder.Services.AddSession(options =>
{
    // 配置会话选项
    options.IdleTimeout = TimeSpan.FromSeconds(60); // 如果用户空闲60秒，则结束会话
    options.Cookie.HttpOnly = false; // 仅通过HTTP传输Cookie
    options.Cookie.IsEssential = true; // 确保Cookie是必需的，不会被浏览器阻止
});

builder.Services.AddDistributedMemoryCache();

// 初始化表结构
DbMysqlContext.SetInitTables();

// 注册数据库上下文
builder.Services.AddScoped<ISqlSugarClient>(provider  =>
{
    return new DbMysqlContext().GetDb();
});

builder.Services.Scan(scan => scan
    .FromAssembliesOf(typeof(UserService)) // 扫描包含这些接口的程序集
    .AddClasses(classes => classes.Where(it => it.Name.EndsWith("Service") || it.Name.EndsWith("Home"))) // 添加所有实现了IServiceA接口的类
    .AsImplementedInterfaces() // 将它们注册为它们的接口类型
    .WithTransientLifetime()); // 设置生命周期为单例


builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins(["http://localhost:3000"])
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowSpecificOrigin");
}


app.UseHttpsRedirection();

// 使用会话中间件
app.UseSession();

//启动静态资源
app.UseStaticFiles();

// 启动鉴权拦截
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
