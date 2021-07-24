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
            var client = new MongoClient(setting.ConnectionString);
            var database = client.GetDatabase(setting.DatabaseName);

            _users = database.GetCollection<User>(setting.UserCollectionName);
        }

        //Get an specific user through username
        public User Get(string userName) => _users.Find<User>(user =>
        user.UserName == userName).FirstOrDefault();

        //Add a new user
        public void Post(User user)
        {
            _users.InsertOne(user);
        }

        //Update user detail
        public void Put(User updatedUser) =>
            _users.ReplaceOne(user => user.UserName == updatedUser.UserName, updatedUser);
    }
}
