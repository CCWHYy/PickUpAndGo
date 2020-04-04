using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Models.Product;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// Product Controller
    /// </summary>
    [Route("api/products")]
    public class ProductController : CustomControllerBase
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        public ProductController(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        //TODO Change positive response types from object to appropriate model!


        /// <summary>
        /// Get by ID
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
        /// Get All
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(500)]
        public IActionResult GetAll()
        {
            try
            {
                var products = Uow.ProductRepository.GetAll();
                var productModels = products.Select(Mapper.Map<ProductModel>);

                return Ok(productModels);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Add product
        /// </summary>
        /// <returns></returns>
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
                    createProductModel.Price <= 0 ||
                    String.IsNullOrWhiteSpace(createProductModel.Brand) ||
                    String.IsNullOrWhiteSpace(createProductModel.QuantityUnit) ||
                    String.IsNullOrWhiteSpace(createProductModel.Category))
                {
                    return BadRequest("Required fields are empty!");
                }

                var product = Mapper.Map<Product>(createProductModel);
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
        /// Update product
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(typeof(object), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Update([FromBody] UpdateProductModel updateProductModel)
        {
            try
            {
                var product = Uow.ProductRepository.Get(updateProductModel.Id);
                if (product == null)
                    return NotFound("Product with given Id was not found!");

                
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }


        /// <summary>
        /// Delete product
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Delete([FromRoute, Required] string id)
        {
            try
            {
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