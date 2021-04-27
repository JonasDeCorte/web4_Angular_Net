using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models.DTO
{
    public class ImageDTO
    {

        public byte[] ImageData { get; set; }
        public int PersoonId { get; set; }
    }
}
