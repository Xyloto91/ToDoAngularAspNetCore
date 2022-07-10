using ToDoAngularAspNetCore.Application.Interfaces;
using ToDoAngularAspNetCore.Application.Mapper;
using ToDoAngularAspNetCore.Application.Models;
using ToDoAngularAspNetCore.Core.Entities;
using ToDoAngularAspNetCore.Core.Repositories;
using ToDoAngularAspNetCore.Infrastructure.Repository;

namespace ToDoAngularAspNetCore.Application.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _toDoRepository;

        public ToDoService(IToDoRepository toDoRepository)
        {
            _toDoRepository = toDoRepository;
        }

        public async Task<ToDoModel> Create(ToDoModel toDoModel)
        {
            var mappedEntity = ObjectMapper.Mapper.Map<ToDo>(toDoModel);

            if (mappedEntity == null)
                throw new ApplicationException($"Entity could not be mapped.");

            var newEntity = await _toDoRepository.AddAsync(mappedEntity);

            return ObjectMapper.Mapper.Map<ToDoModel>(newEntity);
        }

        public async Task Delete(int id)
        {
            var deleteToDo = await _toDoRepository.GetByIdAsync(id);

            if (deleteToDo == null)
                throw new ApplicationException($"Entity could not be loaded.");

            await _toDoRepository.DeleteAsync(deleteToDo);
        }

        public async Task<ToDoModel> GetToDoById(int id)
        {
            var toDo = await _toDoRepository.GetByIdAsync(id);
            var mapped = ObjectMapper.Mapper.Map<ToDoModel>(toDo);
            return mapped;
        }

        public async Task<IEnumerable<ToDoModel>> GetToDos(int userId)
        {
            var toDoList = await _toDoRepository.GetAllAsync(userId);
            var mapped = ObjectMapper.Mapper.Map<IEnumerable<ToDoModel>>(toDoList);
            return mapped;
        }

        public async Task Update(ToDoModel toDoModel)
        {
            var editToDo = await _toDoRepository.GetByIdAsync(toDoModel.Id);

            if (editToDo == null)
                throw new ApplicationException($"Entity could not be loaded.");

            ObjectMapper.Mapper.Map(toDoModel, editToDo);

            await _toDoRepository.UpdateAsync(editToDo);
        }
    }
}
