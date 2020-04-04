using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Entities
{
    public class UserStore
    {
        public string UserId { get; set; }
        public string StoreId { get; set; }
        public string Role { get; set; }

        public User User { get; set; }
        public Store Store { get; set; }
    }
}
