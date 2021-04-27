using Microsoft.EntityFrameworkCore;
using RestApi.Data.Mappers;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Bewoner> Bewoners { get; set; }
        public DbSet<Personeel> Personeels { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ImageConfiguration());
            builder.ApplyConfiguration(new BewonerConfiguration());
            builder.ApplyConfiguration(new PersoneelConfiguration());
           

            //Another way to seed the database
            builder.Entity<Bewoner>().HasData(
                 new Bewoner { Id = 1, Name = "1lorem ipsum", GeboorteDatum = DateTime.Now, EetOpKamer = true, WordtGehaald = false },
                 new Bewoner { Id = 2, Name = "2ipsumlorem ipsum", GeboorteDatum = DateTime.Now, EetOpKamer = false, WordtGehaald = true });
            builder.Entity<Personeel>().HasData(
               new Personeel { Id = 1, Name = "1lorem ipsumlorem ipsum", Functie = "Keuken", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" },
               new Personeel { Id = 2, Name = "2ipsumlorem ipsum", Functie = "Zaal", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" },
                new Personeel { Id = 3, Name = "3orem ipsumlorem ipsum", Functie = "Keuken", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" },
               new Personeel { Id = 4, Name = "4 ipsumlorem ipsum", Functie = "Zaal", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" });



        }
    }
}
