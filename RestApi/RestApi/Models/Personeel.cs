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
        public DateTime GeboorteDatum { get; set; }
        public DateTime DatumInDienst { get; set; }
        public string Email { get; set; }
        public string TelefoonNummer { get; set; }
        public string Straat { get; set; }
        public string HuisNummer { get; set; }
        public string PostCode { get; set; }
        public string Land { get; set; }
    }
    }

