using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ToDoAngularAspNetCore.Application.Models;
using ToDoAngularAspNetCore.Core.Entities;

namespace ToDoAngularAspNetCore.Api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, 
                                 SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var result = await _userManager.CreateAsync(new ApplicationUser(registerModel.Email, registerModel.FirstName, registerModel.LastName), registerModel.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Invalid registrationg details!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var appUser = await _userManager.FindByEmailAsync(loginModel.Email);

            if (appUser == null) return BadRequest("User not registered!");

            var result = await _signInManager.PasswordSignInAsync(appUser.UserName, loginModel.Password, false, false);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Invalid login details!");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }
    }
}
