using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using static WebAPI.Models.UserCartDBSetting;

namespace WebAPI.Services
{
    public class UserCartService
    {
        private readonly IMongoCollection<UserCart> _userCarts;

        public UserCartService(IUserCartListDBSetting setting)
        {
            var client = new MongoClient(setting.ConnectionString);
            var database = client.GetDatabase(setting.DatabaseName);
            _userCarts = database.GetCollection<UserCart>(setting.UserCartCollectionName);
        }

        //Get cart of a specific user
        public UserCart Get(string userName) =>
            _userCarts.Find<UserCart>(userCart => userCart.UserName == userName).FirstOrDefault();

        //Add a new usercart
        public void Post(UserCart cart)
        {
            _userCarts.InsertOne(cart);
        }

        //Remove a cart
        public void Delete(UserCart cart) =>
            _userCarts.DeleteOne(match => match.UserName == cart.UserName);

        //Update or clear cart of a specific user
        public void Put(UserCart updatedCart)
        {
            Delete(updatedCart);
            Post(updatedCart);
        }
    }
}
