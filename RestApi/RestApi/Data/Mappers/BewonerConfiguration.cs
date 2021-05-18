using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Mappers
{
    public class BewonerConfiguration : IEntityTypeConfiguration<Bewoner>
    {
        public void Configure(EntityTypeBuilder<Bewoner> builder)
        {
            builder.ToTable("Bewoner");
            builder.HasKey(x => x.Id);         
            builder.Property(r => r.Name).IsRequired().HasMaxLength(50);
        }
    }
}
