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

builder.Services.AddScoped<VisitStatService>();  // ע��ͳ�Ʒ���
builder.Services.AddControllers(options =>
{
    options.Filters.Add<VisitTrackingFilter>();  // ע��ȫ�ֹ�����
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



// ��� JWT ��֤����
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

// ����Session
builder.Services.AddSession(options =>
{
    // ���ûỰѡ��
    options.IdleTimeout = TimeSpan.FromSeconds(60); // ����û�����60�룬������Ự
    options.Cookie.HttpOnly = false; // ��ͨ��HTTP����Cookie
    options.Cookie.IsEssential = true; // ȷ��Cookie�Ǳ���ģ����ᱻ�������ֹ
});

builder.Services.AddDistributedMemoryCache();

// ��ʼ����ṹ
DbMysqlContext.SetInitTables();

// ע�����ݿ�������
builder.Services.AddScoped<ISqlSugarClient>(provider  =>
{
    return new DbMysqlContext().GetDb();
});

builder.Services.Scan(scan => scan
    .FromAssembliesOf(typeof(UserService)) // ɨ�������Щ�ӿڵĳ���
    .AddClasses(classes => classes.Where(it => it.Name.EndsWith("Service") || it.Name.EndsWith("Home"))) // �������ʵ����IServiceA�ӿڵ���
    .AsImplementedInterfaces() // ������ע��Ϊ���ǵĽӿ�����
    .WithTransientLifetime()); // ������������Ϊ����


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

// ʹ�ûỰ�м��
app.UseSession();

//������̬��Դ
app.UseStaticFiles();

// ������Ȩ����
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
