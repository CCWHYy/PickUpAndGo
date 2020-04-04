using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class OrderProductConfiguration : IEntityTypeConfiguration<OrderProduct>
    {
        public void Configure(EntityTypeBuilder<OrderProduct> builder)
        {
            builder.HasKey(x => new {x.OrderId, x.ProductId});

            builder.HasOne<Order>(x => x.Order)
                .WithMany(s => s.OrderProducts)
                .HasForeignKey(f => f.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Product>(x => x.Product)
                .WithMany(s => s.OrderProducts)
                .HasForeignKey(f => f.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}