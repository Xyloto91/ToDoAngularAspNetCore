using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoAngularAspNetCore.Core.Entities;
using ToDoAngularAspNetCore.Core.Repositories;
using ToDoAngularAspNetCore.Infrastructure.Data;

namespace ToDoAngularAspNetCore.Infrastructure.Repository
{
    public class ToDoRepository : IToDoRepository
    {
        public readonly ToDoAngularDbContext _toDoAngularDbContext;

        public ToDoRepository(ToDoAngularDbContext toDoAngularDbContext)
        {
            _toDoAngularDbContext = toDoAngularDbContext;
        }

        public async Task<ToDo> AddAsync(ToDo toDo)
        {
            _toDoAngularDbContext.Set<ToDo>().Add(toDo);
            await _toDoAngularDbContext.SaveChangesAsync();

            return toDo;
        }

        public async Task DeleteAsync(ToDo toDo)
        {
            _toDoAngularDbContext.Set<ToDo>().Remove(toDo);
            await _toDoAngularDbContext.SaveChangesAsync();
        }

        public async Task<List<ToDo>> GetAllAsync(int userId)
        {
            return await _toDoAngularDbContext.ToDos.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<ToDo?> GetByIdAsync(int id)
        {
            return await _toDoAngularDbContext.Set<ToDo>().FindAsync(id);
        }

        public async Task<ToDo> UpdateAsync(ToDo toDo)
        {
            _toDoAngularDbContext.Entry(toDo).State = EntityState.Modified;
            await _toDoAngularDbContext.SaveChangesAsync();

            return toDo;
        }
    }
}
