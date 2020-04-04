using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Models;
using PickUpAndGo.Persistence.Context;

namespace PickUpAndGo.Controllers
{
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UserController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute, Required] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("ID is required!");
            
            var user = _dbContext.Users.Find(id);
            return Ok(user);
        }

        
        public IActionResult Create([FromBody] CreateUserModel createUserModel)
        {
            return Ok();
        }
    }
}