using System.Collections.Generic;

namespace PickUpAndGo.Models.Store
{
    public class StoreModel
    {
        public string Id { get; set; }
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
    }
}