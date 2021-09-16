using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class QueryStringParameters
    {
        private int pageSize = 10;

        //For Paging
        public int PageNumber { get; set; } = 1;
        public int PageSize {
            get {
                return pageSize;
            } set {
                pageSize = (value > 10) ? 10 : value;
            } 
        }

        //For Sorting
        public string sortProperty { get; set; } = "";
        public string sortingOrder { get; set; } = "";

        //For Searching
        public string searchString { get; set; } = "";

        //For categorized product
        public string Category { get; set; } = "";
        public string SubCategory { get; set; } = "";
    }
}
