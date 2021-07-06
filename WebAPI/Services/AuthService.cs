using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using static WebAPI.Models.UserDBSetting;

namespace WebAPI.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<User> _users;

        public AuthService(IUserListDBSetting setting)
        {
            ;
        }
    }
}
