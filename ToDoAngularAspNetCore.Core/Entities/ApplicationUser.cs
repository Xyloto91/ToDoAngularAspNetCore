using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ToDoAngularAspNetCore.Core.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public ApplicationUser()
        {

        }

        public ApplicationUser(string email)
        {
            Email = email;
            UserName = email;
        }
    }

    public class ApplicationRole : IdentityRole<int>
    {

    }
}
