using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public interface IImageRepository
    {
        public IEnumerable<Image> GetAll();
        public Image GetById(int id);
        public Image GetByPersoonId(int id);
        public void AddImage(Image image);
        public void SaveChanges();
    }
}
