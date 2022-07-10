using Microsoft.EntityFrameworkCore;
using ToDoAngularAspNetCore.Application.Interfaces;
using ToDoAngularAspNetCore.Application.Services;
using ToDoAngularAspNetCore.Core.Entities;
using ToDoAngularAspNetCore.Core.Repositories;
using ToDoAngularAspNetCore.Infrastructure.Data;
using ToDoAngularAspNetCore.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ToDoAngularDbContext>(x => 
    x.UseSqlServer(builder.Configuration.GetConnectionString("ToDoAngluarAspNetCoreConnection")));

builder.Services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ToDoAngularDbContext>();

builder.Services.AddScoped<IToDoRepository, ToDoRepository>();
builder.Services.AddScoped<IToDoService, ToDoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.WithOrigins("https://localhost:44426")
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(name: "default",
                       pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
