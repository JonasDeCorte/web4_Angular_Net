using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Mappers
{
    public class PersoneelConfiguration : IEntityTypeConfiguration<Personeel>
    {
        public void Configure(EntityTypeBuilder<Personeel> builder)
        {
            builder.ToTable("Personeel");
            builder.HasKey(x => x.Id);
            builder.Property(r => r.Name).IsRequired().HasMaxLength(50);
            builder.HasMany(x => x.Bewoners).WithOne().OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(b => b.Image).WithOne(i => i.Persoon).HasForeignKey<Image>(b => b.PersoonId);
        }
    }
}
