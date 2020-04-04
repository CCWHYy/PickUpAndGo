using System.Collections.Generic;

namespace PickUpAndGo.Persistence.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<UserStore> UserStores { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
} 