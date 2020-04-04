using Microsoft.EntityFrameworkCore;
using PickUpAndGo.Persistence.Context.Configurations;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<StoreOrder> StoreOrders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<UserStore> UserStores { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new StoreConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new StoreOrderConfiguration());
            modelBuilder.ApplyConfiguration(new OrderProductConfiguration());
            modelBuilder.ApplyConfiguration(new UserStoreConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}