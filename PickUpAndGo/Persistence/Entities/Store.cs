using System.Collections.Generic;

namespace PickUpAndGo.Persistence.Entities
{
    public class Store : BaseEntity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string StreetNumber { get; set; }
        public string Route { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string LogoUrl { get; set; }

        public ICollection<Product> Products { get; set; }
        public ICollection<StoreOrder> StoreOrders { get; set; }
        public ICollection<User> Users { get; set; }
    }
}