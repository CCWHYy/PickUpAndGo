using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context.Configurations
{
    public class EmployeeStoreConfiguration : IEntityTypeConfiguration<EmployeeStore>
    {
        public void Configure(EntityTypeBuilder<EmployeeStore> builder)
        {
            builder.HasKey(x => new {x.EmployeeId, x.StoreId});

            builder.HasOne<Employee>(x => x.Employee)
                .WithMany(s => s.EmployeeStores)
                .HasForeignKey(f => f.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Store>(x => x.Store)
                .WithMany(s => s.EmployeeStores)
                .HasForeignKey(f => f.StoreId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}