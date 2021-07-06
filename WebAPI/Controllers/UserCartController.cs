using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/usercart")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private readonly UserCartService _userCartService;

        public UserCartController(UserCartService userCartService)
        {
            _userCartService = userCartService;
        }

        //Get cart of a specific user
        [HttpGet , Route("query")]
        public ActionResult<UserCart> GetUserCart(string userName)
        {
            UserCart cart = _userCartService.Get(userName);

            if (cart == null)
                return NotFound();
            return cart;
        }

        //Update cart of a specific user
        [HttpPut , Route("update")]
        public IActionResult UpdateUserCart([FromBody]UserCart updatedCart)
        {
            var cart = _userCartService.Get(updatedCart.UserName);

            if (cart == null)
                return BadRequest("This user cart doesn't exist to update!");

            _userCartService.Put(updatedCart);
            return Ok();
        }

        //Add a new usercart
        [HttpPost , Route("add")]
        public IActionResult AddUserCart([FromBody]UserCart newCart)
        {
            var cart = _userCartService.Get(newCart.UserName);

            if (cart != null)
                return BadRequest("You've already added a cart for this user");

            _userCartService.Post(newCart);
            return Ok();
        }

        //Delete an usercart
        [HttpDelete , Route("delete")]
        public IActionResult RemoveUserCart([FromBody]UserCart cart)
        {
            _userCartService.Delete(cart);

            //Push an empty cart after cleaning a cart
            UserCart dummyCart = new UserCart();
            dummyCart.UserName = cart.UserName;
            _userCartService.Post(dummyCart);
            return Ok();
        }
    }
}
