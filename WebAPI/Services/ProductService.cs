using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using static WebAPI.Models.ProductDBSetting;

namespace WebAPI.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(IProductListDBSetting setting)
        {
            var client = new MongoClient(setting.ConnectionString);
            var database = client.GetDatabase(setting.DatabaseName);

            _products = database.GetCollection<Product>(setting.ProductCollectionName);
        }

        //Get an specific product
        public Product Get(string pName) =>
            _products.Find<Product>(product => product.pName == pName).FirstOrDefault();

        //Get the list of product
        public List<Product> Get() =>
            _products.Find(product => true).ToList();

        //Add a new product
        public void Post(Product product)
        {
            _products.InsertOne(product);
        }

        //Update a product details
        public void Put(Product updatedProduct) =>
            _products.ReplaceOne(product => product.pName == updatedProduct.pName, updatedProduct);

        //Remove a product
        public void Delete(Product pr) =>
            _products.DeleteOne(product => product.pName == pr.pName);
    }
}
