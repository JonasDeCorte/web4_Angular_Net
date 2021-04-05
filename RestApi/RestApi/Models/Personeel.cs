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
        }
    }

