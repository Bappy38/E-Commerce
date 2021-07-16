using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class OrderDBSetting
    {
        public class OrderListDBSetting : IOrderListDBSetting
        {
            public string OrderCollectionName { get; set; }
            public string ConnectionString { get; set; }
            public string DatabaseName { get; set; }
        }

        public interface IOrderListDBSetting
        {
            public string OrderCollectionName { get; set; }
            public string ConnectionString { get; set; }
            public string DatabaseName { get; set; }
        }
    }
}
