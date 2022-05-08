using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoAngularAspNetCore.Core.Entities;

namespace ToDoAngularAspNetCore.Core.Repositories
{
    public interface IToDoRepository
    {
        Task<ToDo> AddAsync(ToDo toDo);

        Task<ToDo> UpdateAsync(ToDo toDo);

        Task DeleteAsync(ToDo toDo);

        Task<ToDo?> GetByIdAsync(int id);

        Task<List<ToDo>> GetAllAsync();
    }
}
