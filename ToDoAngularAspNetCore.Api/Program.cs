using Microsoft.EntityFrameworkCore;
using ToDoAngularAspNetCore.Application.Services;
using ToDoAngularAspNetCore.Infrastructure.Data;
using ToDoAngularAspNetCore.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ToDoAngularDbContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("ToDoAngluarAspNetCoreConnection")));
builder.Services.AddScoped<ToDoRepository>();
builder.Services.AddScoped<ToDoService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.WithOrigins("https://localhost:44426")
                              .AllowAnyMethod()
                              .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllerRoute(name: "default",
                       pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
