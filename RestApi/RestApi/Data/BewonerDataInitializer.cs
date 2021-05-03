using Microsoft.AspNetCore.Identity;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class BewonerDataInitializer
    {
        
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;
        public BewonerDataInitializer(ApplicationDbContext DbContext, UserManager<IdentityUser> userManager)
        {
            _dbContext = DbContext;
            _userManager = userManager;
        }
        public async Task InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                Admin HoofdAdmin = new Admin { Email = "master@hogent.be", FirstName = "admin", LastName = "master" };
                _dbContext.Admins.Add(HoofdAdmin);
                await CreateUser(HoofdAdmin.Email, "P@ssword1111");

                Admin ReserveAdmin = new Admin { Email = "Reservemaster@hogent.be", FirstName = "admin", LastName = "reserve" };
               
                _dbContext.Admins.Add(ReserveAdmin);
                await CreateUser(ReserveAdmin.Email, "P@ssword1111");   
                
                _dbContext.SaveChanges();
                ICollection<Personeel> persooneelsLijst = new List<Personeel>();
                Personeel persoon;
                string functie = "";
                for (int j = 1; j < 10; j++)
                {
                    functie = j % 2 == 0 ? functie = "Keuken" : functie = "Zaal";
                    
                    persoon = new Personeel { Name = $"{j}test", Functie = functie, GeboorteDatum = DateTime.Now, DatumInDienst = DateTime.Now, Email = $"{j}test@Hogent.be", TelefoonNummer = "0478194517", Straat = "erkegemstraat", HuisNummer = $"{j}10", Land = "belgie", PostCode = "8020" };

                    persooneelsLijst.Add(persoon);
                }
                _dbContext.Personeels.AddRange(persooneelsLijst);
                _dbContext.SaveChanges();

                //seeding the database with bewoners, see DBContext     
                ICollection<Bewoner> bewoners = new List<Bewoner>();
                Bewoner bewoner;
                Boolean value1, value2;
                for (int i = 1; i < 10; i++) {
                    value1 = i % 2 == 0 ? value1 = true : value1 = false;
                    value2 = i % 2 == 0 ? value2 = false : value2 = true;
                    bewoner = new Bewoner {  Name = $"{i}test", EetOpKamer = value1, WordtGehaald = value2, GeboorteDatum = DateTime.Now, Personeel = _dbContext.Personeels.FirstOrDefault(x => x.Id == i)};
                    bewoners.Add(bewoner);
                }
                _dbContext.Bewoners.AddRange(bewoners);
                _dbContext.SaveChanges();

            }
        }
        private async Task CreateUser(string email, string password)
        {
            var user = new IdentityUser { UserName = email, Email = email };

            await _userManager.CreateAsync(user, password);
        }
    }
}
