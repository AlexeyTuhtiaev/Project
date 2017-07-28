using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public int? Year { get; set; }
        public string Gender { get; set; }
        public string NickName { get; set; }

        public virtual List<Route> Routes { get; set; }

        public ApplicationUser()
        {
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            // Add custom user claims here
            //userIdentity.AddClaim(new Claim("nick", this.NickName));

            return userIdentity;
        }
    }
}
