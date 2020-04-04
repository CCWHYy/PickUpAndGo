using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence.Repositories.Employees
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private AppDbContext Context => BaseContext as AppDbContext;
        public EmployeeRepository(AppDbContext context) : base(context)
        {
        }
    }
}
