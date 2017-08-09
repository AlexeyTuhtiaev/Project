using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Routes.Dal.Entities
{
    public class RoutesContext : IdentityDbContext<ApplicationUser>
    {
        /// <summary>
        /// Конструктор класса
        /// </summary>
        ///// <param name="name"> имя строки подключения </param>
        public RoutesContext() : base("RoutesDBConnection")
        {
            Database.SetInitializer(new RoutesContextInitializer());
        }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Marker> RoutesMarkers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<WayPoint> WayPoints { get; set; }


        public static RoutesContext Create()
        {
            return new RoutesContext();
        }
    }

    class RoutesContextInitializer : DropCreateDatabaseAlways<RoutesContext>
    {
        protected override void Seed(RoutesContext context)
        {
            // Создаем менеджеры ролей и пользователей
            RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            IdentityRole roleAdmin, roleUser = null;
            ApplicationUser userAdmin, simpleUser = null;

            // поиск роли admin
            roleAdmin = roleManager.FindByName("admin");
            if (roleAdmin == null)
            {
                // создаем, если на нашли
                roleAdmin = new IdentityRole { Name = "admin" };
                var result = roleManager.Create(roleAdmin);
            }

            // поиск роли user
            roleUser = roleManager.FindByName("user");
            if (roleUser == null)
            {
                // создаем, если на нашли
                roleUser = new IdentityRole { Name = "user" };
                var result = roleManager.Create(roleUser);
            }

            // поиск пользователя admin@mail.ru
            userAdmin = userManager.FindByEmail("admin@mail.ru");
            if (userAdmin == null)
            {
                // создаем, если на нашли
                userAdmin = new ApplicationUser
                {
                    NickName = "admin",
                    Email = "admin@mail.ru",
                    UserName = "admin@mail.ru",
                    Gender = "M",
                    Year = 1995
                };
                userManager.Create(userAdmin, "111111");
                // добавляем к роли admin
                userManager.AddToRole(userAdmin.Id, "admin");
            }

            //simpleUser = new ApplicationUser
            //{
            //    NickName = "SimpleUser",
            //    Email = "simpleUser@mail.ru",
            //    UserName = "simpleUser@mail.ru",
            //    Gender = "F",
            //    Year = 1985
            //};
            //userManager.Create(simpleUser, "111");
            //string uID = simpleUser.Id;
            //userManager.AddToRole(uID, "user");


            WayPoint wayPoint1 = new WayPoint { RouteId = 1, Numbering = 1, WayPointID = 1, Point = "Минск, Беларусь" };
            WayPoint wayPoint2 = new WayPoint { RouteId = 1, Numbering = 2, WayPointID = 2, Point = "Могилев, Могилевская область, Беларусь" };
            WayPoint wayPoint3 = new WayPoint { RouteId = 2, Numbering = 1, WayPointID =3, Point = "брест, Гродненская область, Беларусь" };
            WayPoint wayPoint4 = new WayPoint { RouteId = 2, Numbering = 2, WayPointID = 4, Point = "Быхов, Могилевская область, Беларусь" };
            WayPoint wayPoint5 = new WayPoint { RouteId = 3, Numbering = 1, WayPointID = 5, Point = "Лепель, Витебская область, Беларусь" };

            context.WayPoints.Add(wayPoint1);
            context.WayPoints.Add(wayPoint2);
            context.WayPoints.Add(wayPoint3);
            context.WayPoints.Add(wayPoint4);
            context.WayPoints.Add(wayPoint5);

            List<Photo> photos1 = new List<Photo> {
                new Photo { Image =File.ReadAllBytes(@"d:\LEXA\БГУИР\DP\myDP\DiplomaPaper\DPPhotos\1.jpg"),
                MimeType="image/jpeg" },
                new Photo { Image =File.ReadAllBytes(@"d:\LEXA\БГУИР\DP\myDP\DiplomaPaper\DPPhotos\2.jpg"),
                MimeType="image/jpeg" }
            };

            List<Photo> photos2 = new List<Photo> {
                new Photo { Image =File.ReadAllBytes(@"d:\LEXA\БГУИР\DP\myDP\DiplomaPaper\DPPhotos\6.jpg"),
                MimeType="image/jpeg" },
                new Photo { Image =File.ReadAllBytes(@"d:\LEXA\БГУИР\DP\myDP\DiplomaPaper\DPPhotos\7.jpg"),
                MimeType="image/jpeg" }
            };

            List<Marker> routesMarkers1 = new List<Marker> {
                new Marker {Title="Ресторан", Content ="Описание ресторана",Photos=photos1,
                    GeoLat = "53.917959",GeoLong = "27.596525", Icon="https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png"},
                new Marker {Title="Библиотека", Content ="Описание Библиотеки",Photos=photos2,
                    GeoLat = "53.930914",GeoLong = "27.645416", Icon="https://maps.google.com/mapfiles/kml/shapes/library_maps.png"}
            };

            List<Route> routes = new List<Route> {
                new Route {ApplicationUser=userAdmin, RouteId = 1, RouteEnterTupe = "Simple",TravelType="WALKING",
                    OriginPoint ="Брест, Брестская область, Беларусь",DestinationPoint="Гомель, Гомельская область, Беларусь",
                Description="Некоторое описание маршрута Брест Некоторое описание маршрута Некоторое описание маршрута ",
                RoutesMarker=routesMarkers1},
                new Route { ApplicationUser=userAdmin,RouteId = 2, RouteEnterTupe = "Simple",TravelType="DRIVING",
                    OriginPoint ="Гродно, Гродненская область, Беларусь",DestinationPoint="Минск, Беларусь" ,
                Description="Некоторое описание маршрута Гродно Некоторое описание маршрута Некоторое описание маршрута "},
                new Route {ApplicationUser=userAdmin, RouteId = 3, RouteEnterTupe = "Simple",TravelType="WALKING",
                    OriginPoint ="Витебск, Витебская область, Беларусь",DestinationPoint="Минск, Беларусь" ,
                Description="Некоторое описание маршрута Витебск Некоторое описание маршрута Некоторое описание маршрута "}
            };


            context.Routes.AddRange(routes);
            context.SaveChanges();
        }
    }
}
