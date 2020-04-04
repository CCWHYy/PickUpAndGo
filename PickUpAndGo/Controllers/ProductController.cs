using System;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Persistence.Context;

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
                return Ok();
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
                return Ok();
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
        public IActionResult Add()
        {
            try
            {
                return Ok();
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
        public IActionResult Update()
        {
            try
            {
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