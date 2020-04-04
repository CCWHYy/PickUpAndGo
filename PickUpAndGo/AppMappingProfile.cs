using AutoMapper;
using PickUpAndGo.Models.Product;
using PickUpAndGo.Models.Store;
using PickUpAndGo.Models.User;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo
{
    /// <summary>
    /// Class containing all mapping profiles
    /// </summary>
    public class AppMappingProfile : Profile
    {
        /// <summary>
        /// 
        /// </summary>
        public AppMappingProfile()
        {
            // User mappings
            CreateMap<CreateUserModel, User>();
            CreateMap<User, UserModel>();

            // Store mappings
            CreateMap<CreateStoreModel, Store>();
            CreateMap<Store, StoreModel>();
            CreateMap<UpdateStoreModel, Store>();

            // Product mappings
            CreateMap<Product, ProductModel>();
            CreateMap<CreateProductModel, Product>();
            CreateMap<UpdateProductModel, Product>();
        }
    }
}