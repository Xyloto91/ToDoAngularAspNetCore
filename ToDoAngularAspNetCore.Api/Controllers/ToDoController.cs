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
        public async Task<ToDoModel> GetById(int id)
        {
            return await _toDoService.GetToDoById(id);
        }

        [HttpPost()]
        public async Task<ToDoModel> Create([FromBody]ToDoModel model)
        {
            return await _toDoService.Create(model);
        }

        [HttpPut]
        public async Task Update([FromBody] ToDoModel model)
        {
            await _toDoService.Update(model);
        }

        [HttpDelete("{id}")]
        public async Task DeleteById(int id)
        {
            await _toDoService.Delete(id);
        }

    }
}
