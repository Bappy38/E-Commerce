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
            _productService.AddOne(product);
            return Ok();
        }

        //Update a product
        [HttpPut , Route("update")]
        public IActionResult UpdateProduct([FromBody]Product product)
        {
            var prod = _productService.GetOne(product.Id);

            if (prod == null)
                return NotFound();

            prod.SL = product.SL;
            prod.Name = product.Name;
            prod.Category = product.Category;
            prod.SubCategory = product.SubCategory;
            prod.Price = product.Price;
            prod.OldPrice = product.OldPrice;
            prod.Quantity = product.Quantity;
            prod.Image = product.Image;
            prod.Unit = product.Unit;
            prod.Description = product.Description;
            prod.Rating = product.Rating;

            _productService.UpdateOne(prod);
            return Ok();
        }

        //Delete a product
        [HttpPost , Route("delete")]
        public IActionResult DeleteProduct([FromBody]Product product)
        {
            var prod = _productService.GetOne(product.Id);

            if (prod == null)
                return NotFound();

            _productService.DeleteOne(product.Id);
            return Ok();
        }

        //Get product list
        [HttpGet, Route("query")]
        public IActionResult GetProducts([FromQuery]QueryStringParameters productParameter)
        {
            var products = _productService.Query(productParameter);
            return Ok(products);
        }

        //Get specific product
        [HttpPost , Route("single-query")]
        public ActionResult<Product> Get([FromBody]Product product)
        {
            var prod = _productService.GetOne(product.Id);

            return prod;
        }
    }
}
