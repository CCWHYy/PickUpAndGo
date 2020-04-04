using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class UserStoreConfiguration : IEntityTypeConfiguration<UserStore>
    {
        public void Configure(EntityTypeBuilder<UserStore> builder)
        {
            builder.HasKey(x => new { x.UserId, x.StoreId });

            builder.HasOne<User>(x => x.User)
                .WithMany(s => s.UserStores)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Store>(x => x.Store)
                .WithMany(s => s.UserStores)
                .HasForeignKey(f => f.StoreId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
