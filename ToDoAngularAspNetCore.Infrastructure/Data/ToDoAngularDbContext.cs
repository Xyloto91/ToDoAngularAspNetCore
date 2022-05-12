﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoAngularAspNetCore.Core.Entities;

namespace ToDoAngularAspNetCore.Infrastructure.Data
{
    public class ToDoAngularDbContext : DbContext
    {
        public DbSet<ToDo> ToDos { get; set; }

        public ToDoAngularDbContext(DbContextOptions options) : base(options)   
        {
             
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo>(ConfigureToDo);
            //base.OnModelCreating(modelBuilder);
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