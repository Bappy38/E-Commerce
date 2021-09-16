using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using static WebAPI.Models.OrderDBSetting;

namespace WebAPI.Services
{
    public class OrderService
    {
        public readonly IMongoCollection<Order> _orders;

        public OrderService(IOrderListDBSetting setting)
        {
            var client = new MongoClient(setting.ConnectionString);
            var database = client.GetDatabase(setting.DatabaseName);
            _orders = database.GetCollection<Order>(setting.OrderCollectionName);
        }

        //Add a new order
        public void Post(Order order)
        {
            System.Guid guid = System.Guid.NewGuid();
            if (order.OrderNo == null)
                order.OrderNo = guid.ToString();

            _orders.InsertOne(order);
        }

        //Remove an order
        public void Delete(Order order) =>
            _orders.DeleteOne(match => match.OrderNo == order.OrderNo);

        //Get the list of order
        public List<Order> Get() =>
            _orders.Find(order => true).ToList();

        //Get the order list of an specific user
        public List<Order> Get(string UserName) =>
            _orders.Find(order => order.UserName == UserName).ToList();

        //Update an order
        public void Put(Order updatedOrder) =>
            _orders.ReplaceOne(order => order.OrderNo == updatedOrder.OrderNo, updatedOrder);
    }
}
