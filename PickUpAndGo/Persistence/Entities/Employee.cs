using System.Collections.Generic;

namespace PickUpAndGo.Persistence.Entities
{
    public class Employee : BaseEntity
    {
        public string Name { get; set; } 
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Email { get; set; }

        public ICollection<EmployeeStore> EmployeeStores { get; set; }
    }
}