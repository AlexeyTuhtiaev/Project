using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Routes.Dal.Entities;
using Microsoft.Owin;
using Routes.Dal.Managers;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;

[assembly: OwinStartup(typeof(Routes.Web.Startup))]
namespace Routes.Web//.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // настраиваем контекст
            app.CreatePerOwinContext<RoutesContext>(RoutesContext.Create);

            // запускаем методы, которые создадут менеджеров
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });
        }
    }
}