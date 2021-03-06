﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PickUpAndGo.Persistence;
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
        /// Unit of Work property provides access to repositories
        /// </summary>
        protected IUnitOfWork Uow { get; private set; }

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="mapper"></param>
        /// <param name="contextAccessor"></param>
        public CustomControllerBase(IHttpContextAccessor contextAccessor, AppDbContext dbContext, IMapper mapper)
        {
            contextAccessor.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            DbContext = dbContext;
            Mapper = mapper;
            Uow = new UnitOfWork(dbContext);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        protected IActionResult InternalServerError(string msg = "An unexpected internal server error has occured!") =>
            StatusCode(500, msg);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        protected IActionResult Created<T>(T model) => StatusCode(201, model);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        protected IActionResult Forbidden(string msg = "Forbidden") => StatusCode(403, msg);
    }
}