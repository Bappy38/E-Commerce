using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(ProductDbClient client)
        {
            _products = client.All();
        }

        public List<Product> GetAll() => _products.Find(product => true).ToList();

        public Product GetOne(string id) =>
            _products.Find<Product>(product => product.Id == id).FirstOrDefault();

        public void UpdateOne(Product updatedProduct) =>
            _products.ReplaceOne(product => product.pName == updatedProduct.pName, updatedProduct);

        public void DeleteOne(Product pr) =>
            _products.DeleteOne(product => product.pName == pr.pName);

        public Product AddOne(Product product)
        {
            _products.InsertOne(product);
            return product;
        }

        public Object Query(QueryStringParameters productParameter)
        {
            var filter = Builders<Product>.Filter.Empty;

            if (!string.IsNullOrEmpty(productParameter.searchString))
            {
                filter = Builders<Product>.Filter
                            .Regex("pName", new BsonRegularExpression(productParameter.searchString, "i")) |
                         Builders<Product>.Filter
                            .Regex("pDescription", new BsonRegularExpression(productParameter.searchString, "i"));
            }

            var find = _products.Find(filter);

            if(productParameter.sortingOrder == "asc")
            {
                if (productParameter.sortProperty == "pName")
                    find = find.SortBy(prod => prod.pName);
                else if (productParameter.sortProperty == "pPrice")
                    find = find.SortBy(prod => prod.pPrice);
            }
            else
            {
                if (productParameter.sortProperty == "pName")
                    find = find.SortByDescending(prod => prod.pName);
                else if (productParameter.sortProperty == "pPrice")
                    find = find.SortByDescending(prod => prod.pPrice);
            }

            var total = find.CountDocuments();

            return new
            {
                data = find.Skip((productParameter.PageNumber - 1) * productParameter.PageSize)
                        .Limit(productParameter.PageSize)
                        .ToList(),
                totProd = total
            };
        }
    }
}
