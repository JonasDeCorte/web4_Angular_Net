using Microsoft.EntityFrameworkCore;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class BewonerContext : DbContext
    {
        public BewonerContext(DbContextOptions<BewonerContext> options): base(options)
        {
        }
        public DbSet<Bewoner> Bewoners { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Bewoner>();
                
            builder.Entity<Bewoner>().Property(r => r.Name).IsRequired().HasMaxLength(50);


            //Another way to seed the database
            builder.Entity<Bewoner>().HasData(
                 new Bewoner { Id = 1, Name = "Heidi Verschaeve", GeboorteDatum = DateTime.Now, EetOpKamer = true, WordtGehaald = false },
                 new Bewoner { Id = 2, Name = "Nico De Corte", GeboorteDatum = DateTime.Now, EetOpKamer = false, WordtGehaald = true });
               


        }
}
}
