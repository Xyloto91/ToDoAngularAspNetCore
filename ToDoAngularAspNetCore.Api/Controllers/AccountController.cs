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
        public async Task<IActionResult> RegisterUser(RegisterModel registerModel)
        {
            var result = await _userManager.CreateAsync(new ApplicationUser(registerModel.Email), registerModel.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Invalid registrationg details!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginModel loginModel)
        {
            var result = await _signInManager.PasswordSignInAsync(new ApplicationUser(loginModel.Email), loginModel.Password, false, false);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest("Invalid login details!");
        }
    }
}
