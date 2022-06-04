using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using ToDoAngularAspNetCore.Core.Entities;

namespace ToDoAngularAspNetCore.Infrastructure.Data
{
    //Check if there is package Microsoft.EntityFrameworkCore.Tools in project 
    //EntityFrameworkCore\Add-Migration
    //EntityFrameworkCore\Update-Database
    public class ToDoAngularDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<ToDo> ToDos { get; set; }

        public ToDoAngularDbContext(DbContextOptions<ToDoAngularDbContext> options) : base(options)   
        {
             
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo>(ConfigureToDo);
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("ToDoAngluarAspNetCoreConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

        private void ConfigureToDo(EntityTypeBuilder<ToDo> builder)
        {
            builder.HasKey(ci => ci.Id);

            builder.Property(cb => cb.Title)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
