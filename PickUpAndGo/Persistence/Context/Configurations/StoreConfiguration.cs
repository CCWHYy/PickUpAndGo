using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class StoreConfiguration : IEntityTypeConfiguration<Store>
    {
        public void Configure(EntityTypeBuilder<Store> builder)
        {
            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.HasKey(x => x.Id);
        }
    }
}