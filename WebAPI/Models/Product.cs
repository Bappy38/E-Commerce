using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Product
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string  Id { get; set; }
        public int pOrder { get; set; }
        public string pName { get; set; }
        public int pPrice { get; set; }
        public string pUnit { get; set; }
        public int pQuantity { get; set; }
        public string pImage { get; set; }
        public string pDescription { get; set; }
    }
}
