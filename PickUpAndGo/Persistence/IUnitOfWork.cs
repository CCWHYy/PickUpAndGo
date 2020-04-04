using PickUpAndGo.Persistence.Repositories.Orders;
using PickUpAndGo.Persistence.Repositories.Products;
using PickUpAndGo.Persistence.Repositories.Stores;
using PickUpAndGo.Persistence.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PickUpAndGo.Persistence
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IStoreRepository StoreRepository { get; }
        IProductRepository ProductRepository { get; }
        IOrderRepository OrderRepository { get; }

        Task<int> CompleteAsync();
    }
}
