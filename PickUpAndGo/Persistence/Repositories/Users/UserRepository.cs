using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Persistence.Repositories.Users
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private AppDbContext Context => ForGenericsOnlyContext as AppDbContext;
        public UserRepository(AppDbContext context) : base(context)
        {
        }   
    }
}
