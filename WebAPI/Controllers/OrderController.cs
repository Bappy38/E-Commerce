using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        //Add a new order
        [HttpPost , Route("add")]
        public IActionResult AddOrder([FromBody]Order newOrder)
        {
            _orderService.Post(newOrder);
            return Ok();
        }

        //Remove an order
        [HttpDelete , Route("delete")]
        public IActionResult RemoveOrder([FromBody]Order oldOrder)
        {
            _orderService.Delete(oldOrder);
            return Ok();
        }

        //Get Order List
        [HttpGet, Route("query")]
        public ActionResult<List<Order>> Get() =>
            _orderService.Get();
    }
}
