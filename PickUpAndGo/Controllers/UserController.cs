using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PickUpAndGo.Auth;
using PickUpAndGo.Auth.Models;
using PickUpAndGo.Auth.PasswordEncryption;
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
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtHandler _jwtHandler;
        private readonly AppSettings _appSettings;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="contextAccessor"></param>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        /// <param name="jwtHandler"></param>
        public UserController(IHttpContextAccessor contextAccessor, AppDbContext dbContext, IMapper mapper, IOptions<AppSettings> appsSettings,
            IJwtHandler jwtHandler) : base(contextAccessor, dbContext, mapper)
        {
            _appSettings = appsSettings.Value;
            _jwtHandler = jwtHandler;
            _passwordHasher = new PasswordHasher(new HashingOptions());
        }

        /// <summary>
        /// Get user by ID [Working]
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UserModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                    return BadRequest("ID is required!");

                var user = Uow.UserRepository.Get(id);

                if (user != null)
                    return Ok(Mapper.Map<UserModel>(user));

                return NotFound("User with given ID does not exist!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Register user [Roles: Anonymous, Owner, Admin] [Working]
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
                if (string.IsNullOrWhiteSpace(createUserModel.Email) ||
                    string.IsNullOrWhiteSpace(createUserModel.Password))
                    return BadRequest();

                var currentUserId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var currentUserRole = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

                var getUserRes = Uow.UserRepository.Find(x => x.Email == createUserModel.Email);

                if (getUserRes != null)
                    return Conflict("User with given email is already registered!");

                if (string.IsNullOrWhiteSpace(currentUserId))
                {
                    var userEntity = new User
                    {
                        Email = createUserModel.Email,
                        Password = _passwordHasher.Hash(createUserModel.Password),
                        Role = Roles.User
                    };

                    var res = Uow.UserRepository.Add(userEntity);

                    await Uow.CompleteAsync();

                    return Created(Mapper.Map<UserModel>(res));
                }

                if (currentUserRole == Roles.User)
                    return BadRequest("You are already registered!");

                if (currentUserRole == Roles.Admin)
                {
                    if (string.IsNullOrWhiteSpace(createUserModel.Role))
                        return BadRequest("Role is required!");

                    var getStoreRes = Uow.StoreRepository.Get(createUserModel.StoreId);

                    if (getStoreRes == null)
                        return BadRequest("Store with given id does not exist.");

                    var entity = new User
                    {
                        Email = createUserModel.Email,
                        Password = _passwordHasher.Hash(createUserModel.Password),
                        StoreId = createUserModel.StoreId,
                        Role = createUserModel.Role,
                    };

                    var res = Uow.UserRepository.Add(entity);

                    await Uow.CompleteAsync();

                    return Created(Mapper.Map<UserModel>(res));
                }

                if (currentUserRole == Roles.Owner)
                {
                    var currentUser = Uow.UserRepository.Get(currentUserId);
                    if (currentUser == null)
                        return InternalServerError();

                    var entity = new User
                    {
                        StoreId = currentUser.StoreId,
                        Email = createUserModel.Email,
                        Password = _passwordHasher.Hash(createUserModel.Password),
                        Role = Roles.Employee
                    };
                    var res = Uow.UserRepository.Add(entity);
                    await Uow.CompleteAsync();
                    return Created(Mapper.Map<UserModel>(res));
                }

                return InternalServerError();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Login [Working]
        /// </summary>
        /// <param name="loginModel"></param>
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

                var user = Uow.UserRepository.Find(x => x.Email == loginModel.Email);

                if (user != null)
                {
                    var passCheck = _passwordHasher.Check(user.Password, loginModel.Password);

                    if (!passCheck.Verified)
                        return Unauthorized("Given email or password is incorrect!");

                    var jwtToken = _jwtHandler.Create(user.Id, user.Role);
                    return Ok(jwtToken);
                }
                else
                {
                    return Unauthorized("Given email or password is incorrect!");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }

        /// <summary>
        /// Get current user details [Working]
        /// </summary>
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
                var user = Uow.UserRepository.Find(x => x.Id == userId);

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

        /// <summary>
        /// Get current environment [Working]
        /// </summary>
        [HttpGet("env")]
        public IActionResult Env()
        {
            try
            {
                return Ok(_appSettings.Environment);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return InternalServerError();
            }
        }
    }
}