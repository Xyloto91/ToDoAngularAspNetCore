using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoAngularAspNetCore.Application.Models
{
    public class ToDoModel
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? CompletedDate { get; set; }
    }
}
