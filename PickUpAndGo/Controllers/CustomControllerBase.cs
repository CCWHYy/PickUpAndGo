using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Persistence.Context;

namespace PickUpAndGo.Controllers
{
    /// <summary>
    /// Custom controller base for code reuse
    /// </summary>
    public class CustomControllerBase : ControllerBase
    {
        /// <summary>
        /// Auto-Mapper 
        /// </summary>
        protected IMapper Mapper { get; set; }

        /// <summary>
        /// 
        /// </summary>
        protected AppDbContext DbContext { get; set; }

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="mapper"></param>
        public CustomControllerBase(AppDbContext dbContext, IMapper mapper)
        {
            DbContext = dbContext;
            Mapper = mapper;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public IActionResult InternalServerError(string msg = "An unexpected internal server error has occured!") =>
            StatusCode(500, msg);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public IActionResult Created<T>(T model) => StatusCode(201, model);
    }
}