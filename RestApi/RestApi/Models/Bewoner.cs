using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public class Bewoner
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime GeboorteDatum { get; set; }
        public bool EetOpKamer { get; set; }
        public bool WordtGehaald { get; set; }
    }
}
