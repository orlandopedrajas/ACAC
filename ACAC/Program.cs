
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;


namespace ACAC
{
    public class Program
    {
        public static void Main(string[] args)
        {

            string DbPath = Path.Combine(AppContext.BaseDirectory,"ACAC.db");
            bool FileExists = System.IO.File.Exists(DbPath);
            using(var Db = new SQLite.SQLiteConnection(DbPath))
            {
                //if (!FileExists)
                //{
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.xItemDrop>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor1_Equipment>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor2_Equipment>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor2_EquipmentUpgrade>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_Equipment>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_EquipmentUpgrade>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_WeaponUpgrade>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor4_Equipment>();
                //    Db.CreateTable<ACAC.Controllers.ItemDropController.Floor4_WeaponCoffer>();
                //}
            }
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }

}
