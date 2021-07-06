using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class UserCartDBSetting
    {
        public class UserCartListDBSetting : IUserCartListDBSetting
        {
            public string UserCartCollectionName { get; set; }
            public string ConnectionString { get; set; }
            public string DatabaseName { get; set; }
        }

        public interface IUserCartListDBSetting
        {
            public string UserCartCollectionName { get; set; }
            public string ConnectionString { get; set; }
            public string DatabaseName { get; set; }
        }
    }
}
