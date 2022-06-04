using Microsoft.AspNetCore.Mvc;
using ToDoAngularAspNetCore.Application.Models;
using ToDoAngularAspNetCore.Application.Services;

namespace ToDoAngularAspNetCore.Api.Controllers
{
    [ApiController]
    [Route("api/to-do")]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _toDoService;

        public ToDoController(ToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _toDoService.GetToDos());
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
