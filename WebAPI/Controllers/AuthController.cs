﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Other;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        //Admin Sign In
        [HttpPost, Route("admin-signin")]
        public IActionResult adminSignIn([FromBody] SignIn admin)
        {
            if (admin == null)
                return BadRequest("Invalid client request");

            var claims = new List<Claim>();
            claims.Add(new Claim("Role", "admin"));

            if (admin.UserName == "admin@Bappy" && admin.Password == "@dm!nB@ppy")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@admin"));

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims.ToArray(),
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString });
            }
            else
                return BadRequest("You are not an admin!");
        }

        //User Sign In
        [HttpPost, Route("user-signin")]
        public IActionResult userSignIn([FromBody] SignIn user)
        {
            if (user == null)
                return BadRequest("Invalid client request");

            var credential = _authService.Get(user.UserName);

            if (credential == null)
                return BadRequest("Username doesn't exist");

            var claims = new List<Claim>();
            claims.Add(new Claim("Role", "user"));

            var passwordHash = new PassHash(credential.Password, user.Password);

            if (user.UserName == credential.UserName && passwordHash.validatePassword())
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims.ToArray(),
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString });
            }
            else
                return BadRequest("Username and Password did not match");
        }

        //User Sign Up
        [HttpPost, Route("user-signup")]
        public IActionResult userSignUp([FromBody] User user)
        {
            var credential = _authService.Get(user.UserName);

            if (credential != null)
                return BadRequest("This username already exist! Try with another username.");

            SignIn cred = new SignIn();
            cred.UserName = user.UserName;
            cred.Password = user.Password;

            PassHash obj = new PassHash(user.Password, "");
            user.Password = obj.getHashedPass();

            _authService.Post(user);

            return userSignIn(cred);
        }

        //Update User Detail
        [HttpPut, Route("userdetail-update")]
        public IActionResult UpdateUserDetail([FromBody] User updatedUser)
        {
            _authService.Put(updatedUser);
            return Ok();
        }

        //Update User Password
        [HttpPut, Route("userpassword-update")]
        public IActionResult UpdateUserPass([FromBody] User updatedUser)
        {
            PassHash obj = new PassHash(updatedUser.Password, "");
            updatedUser.Password = obj.getHashedPass();
            _authService.Put(updatedUser);
            return Ok();
        }

        //Get an specific user
        [HttpPost, Route("query-user")]
        public ActionResult<User> GetUser([FromBody] User user)
        {
            User ret = _authService.Get(user.UserName);
            if (ret == null)
                return NotFound();
            return ret;
        }
    }
}
