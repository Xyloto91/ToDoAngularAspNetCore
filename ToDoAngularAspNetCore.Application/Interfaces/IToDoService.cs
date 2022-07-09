using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoAngularAspNetCore.Application.Models;

namespace ToDoAngularAspNetCore.Application.Interfaces
{
    public interface IToDoService
    {
        Task<IEnumerable<ToDoModel>> GetToDos(int userId);
        Task<ToDoModel> GetToDoById(int id);
        Task<ToDoModel> Create(ToDoModel toDoModel);
        Task Update(ToDoModel toDoModel);
        Task Delete(int id);
    }
}
