using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class StoreOrderConfiguration : IEntityTypeConfiguration<StoreOrder>
    {
        public void Configure(EntityTypeBuilder<StoreOrder> builder)
        {
            builder.HasKey(x => new {x.OrderId, x.StoreId});

            builder.HasOne<Order>(x => x.Order)
                .WithMany(s => s.StoreOrders)
                .HasForeignKey(f => f.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Store>(x => x.Store)
                .WithMany(s => s.StoreOrders)
                .HasForeignKey(f => f.StoreId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}