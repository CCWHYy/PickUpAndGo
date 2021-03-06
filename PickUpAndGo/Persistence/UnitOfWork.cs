﻿using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PickUpAndGo.Persistence.Repositories.Products;
using PickUpAndGo.Persistence.Repositories.Stores;
using PickUpAndGo.Persistence.Repositories.Orders;
using PickUpAndGo.Persistence.Repositories.OrdersProducts;

namespace PickUpAndGo.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppDbContext _context;

        public IUserRepository UserRepository { get; private set; }
        public IStoreRepository StoreRepository { get; private set; }
        public IProductRepository ProductRepository { get; private set; }
        public IOrderRepository OrderRepository { get; private set; }

        public IOrderProductRepository OrderProductRepository { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            UserRepository = new UserRepository(context);
            StoreRepository = new StoreRepository(context);
            ProductRepository = new ProductRepository(context);
            OrderRepository = new OrderRepository(context);
            OrderProductRepository = new OrderProductRepository(context);
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