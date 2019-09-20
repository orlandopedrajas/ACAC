
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
                if (!FileExists)
                {
                    Db.CreateTable<ACAC.Controllers.ItemDropController.xItemDrop>();
                    Db.CreateTable<ACAC.Controllers.ItemDropController.Equipment>();
                    Db.CreateTable<ACAC.Controllers.ItemDropController.EquipmentUpgrade>();
                    Db.CreateTable<ACAC.Controllers.ItemDropController.Weapon>();
                    Db.CreateTable<ACAC.Controllers.ItemDropController.WeaponUpgrade>();

                    var dbh = new ACAC.Controllers.ItemDropController.DbHandler();
                    dbh.InitializeDrops();
                    dbh.InitializeEquipmentDrops();

                    foreach (ACAC.Controllers.ItemDropController.xItemDrop x in dbh.InitializeDrops())
                    {
                        dbh.AddItemDrop(x);
                    }

                    foreach (ACAC.Controllers.ItemDropController.Equipment equip in dbh.InitializeEquipmentDrops())
                    {
                        dbh.AddEquipmentDrop(equip);
                    }
                }
            }
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }

}
