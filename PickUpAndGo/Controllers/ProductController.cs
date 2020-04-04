using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Auth;
using PickUpAndGo.Models.Product;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// Product Controller [Working]
    /// </summary>
    [Route("api/products")]
    public class ProductController : CustomControllerBase
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="contextAccessor"></param>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        public ProductController(IHttpContextAccessor contextAccessor, AppDbContext dbContext, IMapper mapper) : base(contextAccessor, dbContext, mapper)
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
                var product = Uow.ProductRepository.Get(id);
                if (product == null)
                    return NotFound("Product with given Id was not found!");

                var productModel = Mapper.Map<ProductModel>(product);

                return Ok(productModel);
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
        public IActionResult GetAll([FromQuery] string storeId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(storeId))
                {
                    var products = Uow.ProductRepository.GetAll();
                    return Ok(products.Select(Mapper.Map<ProductModel>));
                }
                else
                {
                    var products = Uow.ProductRepository.FindAll(x => x.StoreId == storeId);
                    return Ok(products.Select(Mapper.Map<ProductModel>));
                }
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
        [Authorize(Roles = "Employee, Owner, Admin")]
        [HttpPost]
        [ProducesResponseType(typeof(object), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create([FromBody] CreateProductModel createProductModel)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(createProductModel.Name) ||
                    String.IsNullOrWhiteSpace(createProductModel.Brand) ||
                    String.IsNullOrWhiteSpace(createProductModel.StoreId) ||
                    String.IsNullOrWhiteSpace(createProductModel.QuantityUnit) ||
                    String.IsNullOrWhiteSpace(createProductModel.Category))
                {
                    return BadRequest("At least one of required fields are empty!");
                }

                if (createProductModel.Price <= 0)
                    return BadRequest("Price must be greater than 0");

                var store = Uow.StoreRepository.Get(createProductModel.StoreId);

                if (store == null)
                    return NotFound("Store with given Id was not found!");

                var product = Mapper.Map<Product>(createProductModel);
                product.Quantity = 0;

                var entity = Uow.ProductRepository.Add(product);
                await Uow.CompleteAsync();

                return Created(Mapper.Map<ProductModel>(entity));
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
        public async Task<IActionResult> Update([FromBody] UpdateProductModel updateProductModel)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(updateProductModel.Name) ||
                    String.IsNullOrWhiteSpace(updateProductModel.Brand) ||
                    String.IsNullOrWhiteSpace(updateProductModel.StoreId) ||
                    String.IsNullOrWhiteSpace(updateProductModel.QuantityUnit) ||
                    String.IsNullOrWhiteSpace(updateProductModel.Category))
                {
                    return BadRequest("At least one of required fields are empty!");
                }

                if (updateProductModel.Price <= 0)
                    return BadRequest("Price must be greater than 0!");

                if (updateProductModel.Quantity < 0)
                    return BadRequest("Quantity cannot be less than 0!");

                var product = Uow.ProductRepository.Get(updateProductModel.Id);
                if (product == null)
                    return NotFound("Product with given Id was not found!");

                var store = Uow.StoreRepository.Get(updateProductModel.StoreId);
                if (store == null)
                    return NotFound("Store with given Id was not found!");

                var entity = Mapper.Map(updateProductModel, product);
                var updatedProduct = Uow.ProductRepository.Update(entity);

                await Uow.CompleteAsync();

                return Ok(Mapper.Map<ProductModel>(Mapper.Map<ProductModel>(updatedProduct)));
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

                var product = Uow.ProductRepository.Get(id);
                if (product == null)
                    return NotFound("Product with given Id was not found!");

                Uow.ProductRepository.Remove(product);
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