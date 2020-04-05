using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public OrderController(IHttpContextAccessor contextAccessor, AppDbContext dbContext, IMapper mapper) : base(contextAccessor, dbContext, mapper)
        {
        }

        /// <summary>
        /// Get by ID [Working]
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            try
            {
                var order = Uow.OrderRepository.Query(p => p.Id == id, null, p => p.OrderProducts).FirstOrDefault();
                if (order == null)
                    return NotFound("Order with given Id was not found!");

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
        /// Get All [Working]
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(500)]
        public IActionResult GetAll()
        {
            try
            {
                var order = Uow.OrderRepository.GetAll();
                var orderModels = order.Select(Mapper.Map<OrderModel>);

                return Ok(orderModels);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Add product [Working]
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(object), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create([FromBody] CreateOrderModel createOrderModel)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(createOrderModel.UserId) ||
                    String.IsNullOrWhiteSpace(createOrderModel.StoreId))
                {
                    return BadRequest("At least one of required fields are empty!");
                }

                var store = Uow.StoreRepository.Get(createOrderModel.StoreId);
                var user = Uow.UserRepository.Get(createOrderModel.UserId);

                if (user == null || store == null)
                {
                    return NotFound("Such user or store doesn't exist!");
                }

                /////////////////////////////////
                ///// If products available /////
                /////////////////////////////////

                var order = Mapper.Map<Order>(createOrderModel);
                order.State = "Not ready";

                var entity = Uow.OrderRepository.Add(order);
                await Uow.CompleteAsync();

                return Created(Mapper.Map<OrderModel>(entity));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Update product [Working]
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Update([FromBody] UpdateOrderModel updateOrderModel)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(updateOrderModel.UserId) ||
                    String.IsNullOrWhiteSpace(updateOrderModel.StoreId))
                {
                    return BadRequest("At least one of required fields are empty!");
                }

                var order = Uow.OrderRepository.Get(updateOrderModel.Id);
                if (order == null)
                    return NotFound("Order with given Id was not found!");

                var store = Uow.StoreRepository.Get(updateOrderModel.StoreId);
                var user = Uow.UserRepository.Get(updateOrderModel.UserId);

                if (user == null || store == null)
                {
                    return NotFound("Such user or store doesn't exist!");
                }


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
        /// Delete product [Working]
        /// </summary>
        /// <returns></returns>
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
