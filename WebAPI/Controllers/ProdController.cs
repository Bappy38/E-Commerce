using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProdController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProdController(ProductService productService)
        {
            _productService = productService;
        }

        //Add a product
        [HttpPost , Route("add")]
        public IActionResult AddProduct([FromBody]Product product)
        {
            var prod = _productService.Get(product.pName);

            if (prod != null)
                return BadRequest("We have already added this product");

            _productService.Post(product);
            return Ok();
        }

        //Update a product
        [HttpPut , Route("update")]
        public IActionResult UpdateProduct([FromBody]Product product)
        {
            var prod = _productService.Get(product.pName);

            if (prod == null)
                return NotFound();

            prod.pPrice = product.pPrice;
            prod.pQuantity = product.pQuantity;
            prod.pImage = product.pImage;
            prod.pUnit = product.pUnit;
            prod.pDescription = product.pDescription;

            _productService.Put(prod);
            return Ok();
        }

        //Delete a product
        [HttpPost , Route("delete")]
        public IActionResult DeleteProduct([FromBody]Product product)
        {
            var prod = _productService.Get(product.pName);

            if (prod == null)
                return NotFound();

            _productService.Delete(product);
            return Ok();
        }

        //Get product list
        [HttpGet, Route("query")]
        public IActionResult GetProducts([FromQuery]QueryStringParameters productParameter)
        {
            var products = _productService.GetProducts(productParameter);
            return Ok(products);
        }

        //Get product count
        [HttpGet , Route("count")]
        public ActionResult<int> ProductsCount()
        {
            var totalItems = _productService.FindAll().Count();
            return totalItems;
        }

        //Get specific product
        [HttpPost , Route("single-query")]
        public ActionResult<Product> Get([FromBody]Product product)
        {
            var prod = _productService.Get(product.pName);

            return prod;
        }
    }
}
