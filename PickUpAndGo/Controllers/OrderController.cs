using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Auth;
using PickUpAndGo.Models.Orders;
using PickUpAndGo.Models.Product;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// Product Controller [Working]
    /// </summary>
    [Route("api/orders")]
    public class OrderController : CustomControllerBase
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        public OrderController(IHttpContextAccessor contextAccessor, AppDbContext dbContext, IMapper mapper) : base(
            contextAccessor, dbContext, mapper)
        {
        }

        /// <summary>
        /// Get by ID [Roles: User, Employee, Owner, Admin] [Working]
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "User, Employee, Owner, Admin")]
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OrderModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            try
            {
                var currentUserId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var currentUserRole = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
                var userStoreId = User.Claims.FirstOrDefault(x => x.Type == "StoreId")?.Value;

                var order = Uow.OrderRepository.Query(p => p.Id == id, null, p => p.OrderProducts).FirstOrDefault();

                if (order == null)
                    return NotFound("Order with given Id was not found!");

                if (currentUserId != order.UserId && currentUserRole == Roles.User)
                    return Unauthorized("You can only access your orders");

                if (currentUserRole == Roles.Employee && order.StoreId != userStoreId)
                {
                    return Unauthorized("You cannot access orders from other stores!");
                }

                var productIds = order.OrderProducts.Select(x => x.ProductId).ToList();
                var products = new List<Product>();
                var allProducts = Uow.ProductRepository;

                foreach (var productId in productIds)
                {
                    products.Add(allProducts.Get(productId));
                }

                var orderModel = Mapper.Map<OrderModel>(order);
                orderModel.Products = products.Select(Mapper.Map<ProductModel>).ToList();

                return Ok(orderModel);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Get All [Roles: User, Employee, Owner, Admin] [Working]
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "User, Employee, Owner, Admin")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OrderModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult GetAll()
        {
            try
            {
                //TODO wszystkie zamowienia w sklepie employee i owner a user tylko swoje a admin wszystkie

                var currentUserId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var currentUserRole = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
                var userStoreId = User.Claims.FirstOrDefault(x => x.Type == "StoreId")?.Value;

                userStoreId = String.IsNullOrWhiteSpace(userStoreId) ? "" : userStoreId;

                // lovely done
                ICollection<Order> orders;

                if (currentUserRole == Roles.Employee || currentUserRole == Roles.Owner)
                {
                    orders = Uow.OrderRepository.FindAll(o => o.StoreId == userStoreId);
                }
                else if (currentUserRole == Roles.User)
                {
                    orders = Uow.OrderRepository.FindAll(o => o.UserId == currentUserId);
                }
                else
                {
                    orders = Uow.OrderRepository.GetAll();
                }

                var orderModels = orders.Select(Mapper.Map<OrderModel>);

                return Ok(orderModels);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Add order with it's products [Roles: User, Employee, Owner, Admin] [Working]
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "User, Employee, Owner, Admin")]
        [HttpPost]
        [ProducesResponseType(typeof(OrderModel), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create([FromBody] CreateOrderModel createOrderModel)
        {
            try
            {
                var currentUserId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrWhiteSpace(createOrderModel.StoreId))
                {
                    return BadRequest("Store ID is required!");
                }

                if (createOrderModel.Products == null || !createOrderModel.Products.Any())
                    return BadRequest("Product list cannot be null!");

                var store = Uow.StoreRepository.Query(x => x.Id == createOrderModel.StoreId, null, i => i.Products)
                    .FirstOrDefault();
                var user = Uow.UserRepository.Get(currentUserId);

                if (user == null || store == null)
                {
                    return NotFound("Such user or store doesn't exist!");
                }

                var order = Mapper.Map<Order>(createOrderModel);
                order.State = "Not ready";
                order.TimeCreated = DateTime.UtcNow;
                order.UserId = currentUserId;

                double totalOrderValue = 0d;

                var storeProducts = new List<Product>();
                var orderProducts = new List<OrderProduct>();
                foreach (var product in createOrderModel.Products)
                {
                    var storeProduct = store.Products.FirstOrDefault(x => x.Id == product.Id);

                    if (storeProduct == null)
                        return BadRequest($"Product with ID: {product.Id} does not exist!");

                    if (storeProduct.Quantity < product.Quantity)
                        return BadRequest($"You can't buy more {storeProduct.Name} than we have!");

                    storeProducts.Add(storeProduct);
                    storeProduct.Quantity = storeProduct.Quantity - product.Quantity;
                    Uow.ProductRepository.Update(storeProduct);
                    orderProducts.Add(new OrderProduct()
                    {
                        ProductId = product.Id,
                        Quantity = product.Quantity,
                        PriceEach = storeProduct.Price,
                        QuantityUnit = storeProduct.QuantityUnit
                    });
                    totalOrderValue += product.Quantity * storeProduct.Price;
                }

                var orderEntity = Mapper.Map<Order>(createOrderModel);
                orderEntity.OrderProducts = orderProducts;
                Uow.OrderRepository.Add(orderEntity);

                var entity = Uow.OrderRepository.Add(order);

                await Uow.CompleteAsync();

                var res = Mapper.Map<OrderModel>(entity);
                res.Products = storeProducts.Select(Mapper.Map<ProductModel>);
                res.TotalOrderValue = totalOrderValue;

                return Created(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Update order [Roles: Employee, Owner, Admin] [Working]
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Employee, Owner, Admin")]
        [HttpPut]
        [ProducesResponseType(typeof(OrderModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Update([FromBody] UpdateOrderModel updateOrderModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(updateOrderModel.State))
                    return BadRequest("State cannot be null!");

                var order = Uow.OrderRepository.Get(updateOrderModel.Id);

                if (order == null)
                    return NotFound("Order with given Id was not found!");


                var entity = Mapper.Map(updateOrderModel, order);
                var updatedOrder = Uow.OrderRepository.Update(entity);

                await Uow.CompleteAsync();

                return Ok(Mapper.Map<OrderModel>(Mapper.Map<OrderModel>(updatedOrder)));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }


        /// <summary>
        /// Delete product [Roles: Employee, Owner, Admin] [Working]
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "Employee, Owner, Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete([FromRoute, Required] string id)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(id))
                {
                    return BadRequest("Id must be specified");
                }

                var order = Uow.OrderRepository.Get(id);
                if (order == null)
                    return NotFound("Product with given Id was not found!");

                Uow.OrderRepository.Remove(order);
                await Uow.CompleteAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }
    }
}