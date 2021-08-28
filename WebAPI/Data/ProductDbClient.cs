using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using static WebAPI.Models.ProductDBSetting;

namespace WebAPI.Data
{
    public class ProductDbClient
    {
        private readonly IMongoCollection<Product> _products;

        public ProductDbClient(IProductListDBSetting settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _products = database.GetCollection<Product>(settings.ProductCollectionName);
        }

        public IMongoCollection<Product> All() => _products;
    }
}
