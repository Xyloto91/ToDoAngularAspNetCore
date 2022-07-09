using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ToDoAngularAspNetCore.Application.Models;
using ToDoAngularAspNetCore.Application.Services;
using ToDoAngularAspNetCore.Core.Entities;

namespace ToDoAngularAspNetCore.Api.Controllers
{
    [Route("api/to-do")]
    [ApiController]
    [Authorize]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService;
        private readonly UserManager<ApplicationUser> _userManager;
        private int _userId;

        public ToDoController(ToDoService toDoService, UserManager<ApplicationUser> userManager)
        {
            _toDoService = toDoService;
            _userManager = userManager;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            int.TryParse(_userManager?.GetUserId(HttpContext?.User), out _userId);
            return Ok(await _toDoService.GetToDos(_userId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _toDoService.GetToDoById(id));
        }

        [HttpPost()]
        public async Task<IActionResult> Create([FromBody]ToDoModel model)
        {
            return Ok(await _toDoService.Create(model));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ToDoModel model)
        {
            await _toDoService.Update(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            await _toDoService.Delete(id);

            return Ok();
        }

    }
}
