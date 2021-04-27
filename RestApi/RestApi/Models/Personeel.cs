using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public class Personeel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
   
        public string Functie { get; set; }
     
        [DataType(DataType.Date)]
        public DateTime GeboorteDatum { get; set; }
      
        [DataType(DataType.Date)]
        public DateTime DatumInDienst { get; set; }
     
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
      
        public string TelefoonNummer { get; set; }
      
        public string Straat { get; set; }
   
        public string HuisNummer { get; set; }
     
        public string PostCode { get; set; }
       
        public string Land { get; set; }
        public ICollection<Bewoner> Bewoners { get;  set; }
        public Image Image { get; set; }

        public void AddBewoner(Bewoner bewoner) {
            if (bewoner != null) {
                Bewoners.Add(bewoner);
            }
            }
        public Bewoner GetBewoner(int id) => Bewoners.SingleOrDefault(i => i.Id == id);
    }
    }

