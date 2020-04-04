using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Models.Store;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// Product Controller
    /// </summary>
    [Route("api/stores")]
    public class StoreController : CustomControllerBase
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="contextAccessor"></param>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        public StoreController(IHttpContextAccessor contextAccessor,AppDbContext dbContext, IMapper mapper) : base(contextAccessor, dbContext, mapper)
        {
        }

        /// <summary>
        /// Get by ID [Working]
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(StoreModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest();

                var getStoreRes = Uow.StoreRepository.Get(id);

                if (getStoreRes != null)
                    return Ok(Mapper.Map<StoreModel>(getStoreRes));

                return NotFound();
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
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<StoreModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult GetAll()
        {
            try
            {
                var getStoresRes = Uow.StoreRepository.GetAll();

                return Ok(getStoresRes.Select(Mapper.Map<StoreModel>));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Add new store [Working]
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(StoreModel), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Add([FromBody] CreateStoreModel createStoreModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(createStoreModel.Name) ||
                    string.IsNullOrWhiteSpace(createStoreModel.Address))
                    return BadRequest("Store Name and Address is required!");

                var getRes = Uow.StoreRepository.Find(x =>
                    x.Name == createStoreModel.Name && x.Address == createStoreModel.Address);

                if (getRes != null)
                    return Conflict("Store with given name nad address already exists!");

                var addResponse = Uow.StoreRepository.Add(Mapper.Map<Store>(createStoreModel));

                await Uow.CompleteAsync();

                if (addResponse != null)
                    return Created(Mapper.Map<StoreModel>(addResponse));


                return InternalServerError();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Update store [Working]
        /// </summary>
        [HttpPut]
        [ProducesResponseType(typeof(StoreModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Update([FromBody] UpdateStoreModel updateStoreModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(updateStoreModel.Id))
                    return BadRequest("Store ID is required!");

                if (string.IsNullOrWhiteSpace(updateStoreModel.Name) ||
                    string.IsNullOrWhiteSpace(updateStoreModel.Address))
                    return BadRequest("Store Name and Address is required!");

                var getResponse = Uow.StoreRepository.Get(updateStoreModel.Id);

                if (getResponse == null)
                    return NotFound("Store with given ID does not exist!");
                
                var entity = Mapper.Map(updateStoreModel, getResponse);
                var updateResponse = Uow.StoreRepository.Update(entity);
                await Uow.CompleteAsync();

                return Ok(Mapper.Map<StoreModel>(updateResponse));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }


        /// <summary>
        /// Delete store [Working]
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete([FromRoute, Required] string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("Store ID is required!");

                var getRes = Uow.StoreRepository.Get(id);

                if (getRes != null)
                {
                    Uow.StoreRepository.Remove(getRes);
                    await Uow.CompleteAsync();
                    return NoContent();
                }

                return NotFound();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }
    }
}