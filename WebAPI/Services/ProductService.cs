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

        public Product GetOne(string Id) =>
            _products.Find<Product>(product => product.Id == Id).FirstOrDefault();

        public void UpdateOne(Product updatedProduct) =>
            _products.ReplaceOne(product => product.Id == updatedProduct.Id, updatedProduct);

        public void DeleteOne(string Id) =>
            _products.DeleteOne(product => product.Id == Id);

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
                            .Regex("Name", new BsonRegularExpression(productParameter.searchString, "i")) |
                         Builders<Product>.Filter
                            .Regex("Description", new BsonRegularExpression(productParameter.searchString, "i"));
            }

            if (!string.IsNullOrEmpty(productParameter.Category))
            {
                filter &= (Builders<Product>.Filter.Eq(product => product.Category, productParameter.Category));
            }

            if (!string.IsNullOrEmpty(productParameter.SubCategory))
            {
                filter &= (Builders<Product>.Filter.Eq(product => product.SubCategory, productParameter.SubCategory));
            }

            var find = _products.Find(filter);

            if(productParameter.sortingOrder == "asc")
            {
                if (productParameter.sortProperty == "Name")
                    find = find.SortBy(prod => prod.Name);
                else if (productParameter.sortProperty == "Price")
                    find = find.SortBy(prod => prod.Price);
            }
            else
            {
                if (productParameter.sortProperty == "Name")
                    find = find.SortByDescending(prod => prod.Name);
                else if (productParameter.sortProperty == "Price")
                    find = find.SortByDescending(prod => prod.Price);
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
