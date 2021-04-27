using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public class Image
    {
        public int Id { get; }
        public byte[] ImageData { get; set; }
        public Personeel Persoon { get; set; }
        public int PersoonId { get; set; }
    }
}
