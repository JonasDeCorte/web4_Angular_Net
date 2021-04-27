﻿using Microsoft.EntityFrameworkCore;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Repositories
{
    public class ImageRepository : IImageRepository
    {

        private readonly ApplicationDbContext _context;
        private readonly DbSet<Image> _images;

        public ImageRepository(ApplicationDbContext context)
        {
            _context = context;
            _images = context.Images;
        }

        public void AddImage(Image image)
        {
            _images.Add(image);
        }

        public IEnumerable<Image> GetAll()
        {
            return _images;
        }

        public Image GetByPersoonId(int id)
        {
            return _images.Include(i => i.Persoon).FirstOrDefault(i => i.Id == id);
        }

        public Image GetById(int id)
        {
            return _images.Include(i => i.Persoon).FirstOrDefault(i => i.PersoonId == id);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
