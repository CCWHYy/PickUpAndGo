using PickUpAndGo.Persistence.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence
{
    interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        Task<int> CompleteAsync();
    }
}
