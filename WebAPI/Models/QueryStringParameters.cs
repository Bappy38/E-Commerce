using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class QueryStringParameters
    {
        const int maxPageSize = 50;
        private int pageSize = 10;
        public int PageNumber { get; set; } = 1;
        public int PageSize { 
            get {
                return pageSize;
            } set {
                pageSize = (value > maxPageSize) ? maxPageSize : value;
            } 
        }
    }
}
