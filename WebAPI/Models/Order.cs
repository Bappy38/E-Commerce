using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Order
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string OrderNo { get; set; }
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string OrderDate { get; set; }
        public Product[] OrderedProductList { get; set; }
        public int TotalCost { get; set; }
    }
}
