using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppDbContext _context;

        public IUserRepository UserRepository { get; private set; }
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            UserRepository = new UserRepository(context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
