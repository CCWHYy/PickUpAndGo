using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PickUpAndGo.Auth;
using PickUpAndGo.Auth.Models;
using PickUpAndGo.Models.User;
using PickUpAndGo.Persistence;
using PickUpAndGo.Persistence.Context;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/users")]
    public class UserController : CustomControllerBase
    {
        private readonly IJwtHandler _jwtHandler;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        public UserController(AppDbContext dbContext, IMapper mapper, IJwtHandler jwtHandler) : base(dbContext, mapper)
        {
            _jwtHandler = jwtHandler;
        }

        /// <summary>
        /// Get user by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UserModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            try
            {
                Console.WriteLine(id);
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("ID is required!");

                var user = Uow.UserRepository.Get(id);

                if (user != null)
                {
                    var res = Mapper.Map<UserModel>(user);
                    return Ok(res);
                }

                return NotFound("User with given ID does not exist!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Create user
        /// </summary>
        /// <param name="createUserModel"></param>
        [HttpPost]
        [ProducesResponseType(typeof(UserModel), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create([FromBody] CreateUserModel createUserModel)
        {
            try
            {
                // TODO some validation before
                var entity = Mapper.Map<User>(createUserModel);

                var res = Uow.UserRepository.Add(entity);

                await Uow.CompleteAsync();

                return Created(Mapper.Map<UserModel>(res));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(UserJwtModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Login([FromBody] LoginUserModel loginModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(loginModel.Email))
                    return BadRequest();

                var user = Uow.UserRepository.Find(x => x.Email == loginModel.Email).FirstOrDefault();

                if (user != null)
                {
                    var jwtToken = _jwtHandler.Create(user.Id);
                    return Ok(jwtToken);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        [Authorize]
        [HttpGet("me")]
        [ProducesResponseType(typeof(UserJwtModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Me()
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var user = Uow.UserRepository.Find(x => x.Id == userId).FirstOrDefault();

                if (user != null)
                    return Ok(Mapper.Map<UserModel>(user));
                else
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