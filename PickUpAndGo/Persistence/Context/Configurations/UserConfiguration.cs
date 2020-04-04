using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Store)
                .WithMany(s => s.Users)
                .HasForeignKey(f => f.StoreId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}