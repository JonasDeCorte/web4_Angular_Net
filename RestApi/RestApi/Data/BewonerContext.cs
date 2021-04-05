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
        public DbSet<Personeel> Personeels { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Bewoner>();             
            builder.Entity<Bewoner>().Property(r => r.Name).IsRequired().HasMaxLength(50);
            builder.Entity<Personeel>();
            builder.Entity<Personeel>().Property(r => r.Name).IsRequired().HasMaxLength(50);

            //Another way to seed the database
            builder.Entity<Bewoner>().HasData(
                 new Bewoner { Id = 1, Name = "1lorem ipsum", GeboorteDatum = DateTime.Now, EetOpKamer = true, WordtGehaald = false },
                 new Bewoner { Id = 2, Name = "2ipsumlorem ipsum", GeboorteDatum = DateTime.Now, EetOpKamer = false, WordtGehaald = true });
            builder.Entity<Personeel>().HasData(
               new Personeel { Id = 1, Name = "1lorem ipsumlorem ipsum", Functie = "Keuken" ,GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email ="test@Hogent.be", TelefoonNummer="0478194517", Straat = "erkegemstraat", HuisNummer="10", Land = "belgie", PostCode ="8020"},
               new Personeel { Id = 2, Name = "2ipsumlorem ipsum", Functie = "Zaal", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now,  Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" },
                new Personeel { Id = 3, Name = "3orem ipsumlorem ipsum",Functie = "Keuken", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" },
               new Personeel { Id = 4, Name = "4 ipsumlorem ipsum", Functie = "Zaal", GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = "test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = "10", Land = "belgie", PostCode = "8020" });



        }
}
}
