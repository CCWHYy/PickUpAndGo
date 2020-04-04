using AutoMapper;
using PickUpAndGo.Models;
using PickUpAndGo.Persistence.Entities;

namespace PickUpAndGo
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile()
        {
            CreateMap<CreateUserModel, User>();
            CreateMap<User, UserModel>();
        }
    }
}