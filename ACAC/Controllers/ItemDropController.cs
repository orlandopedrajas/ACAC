using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using SQLite;




namespace ACAC.Controllers
{
     [Route("api/[controller]")]
    public class ItemDropController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<xItemDrop> xItemDrops()
        {

            DbHandler Dbh = new DbHandler();
            return Dbh.GetItemDrops();
        }
        [HttpGet("[action]")]
        public IEnumerable<Equipment> xEquipmentDrops()
        {
            DbHandler Dbh = new DbHandler();
            return Dbh.GetEquipmentDrops();
        }
        [HttpPost("[action]")]
        public IActionResult addDrop(String x)
        {
            
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");

            Console.Write(x);
            return Ok();
        }
        
  
        public class DbHandler
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory,"ACAC.db");
            //SQLiteConnection Db;
            //public  DbHandler()
            //{                
            //    bool FileExists = System.IO.File.Exists(DbPath);
            //    using(Db = new SQLite.SQLiteConnection(DbPath))
            //    {
            //        if (!FileExists)
            //        {
            //            Db.CreateTable<xItemDrop>();
            //            Db.CreateTable<Equipment>();
            //            Db.CreateTable<EquipmentUpgrade>();
            //            Db.CreateTable<Weapon>();
            //            Db.CreateTable<WeaponUpgrade>();

            //            foreach (xItemDrop x in InitializeDrops())
            //            {
            //                AddItemDrop(x);
            //            }
            //            foreach (Equipment equip in InitializeEquipmentDrops())
            //            {
            //                AddEquipmentDrop(equip);
            //            }
            //        }
            //    }
            //}

            public IEnumerable<xItemDrop> GetItemDrops()
            {
                using ( var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<xItemDrop>("Select * from xItemDrop");
                }
                      
            }

            public IEnumerable<Equipment> GetEquipmentDrops()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Equipment>("Select * from Equipment");
                }
                    
            }

            public void AddItemDrop(xItemDrop xItem)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(xItem);  
                }
                     
            }
            public void AddEquipmentDrop(Equipment xEquip)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(xEquip);
                }
                    
            }
            public IEnumerable<xItemDrop> InitializeDrops()
            {
                //var rng = new Random();
                return Enumerable.Range(1, 5).Select(index => new xItemDrop
                {
                    dateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                    floor = "Eden Savage Floor 1",
                    name = "Lan Mantear",
                    equipment = "Yes",
                    equipmentupgrade = "Yes",
                    tomestone = "Yes",
                    weapon = "Yes",
                    weaponupgrade = "Yes"
                });
            }
            public IEnumerable<Equipment> InitializeEquipmentDrops()
            {
                return Enumerable.Range(1, 5).Select(index => new Equipment
                {
                    name = getName(index)
                });
            }
            private string getName(int index)
            {
                switch(index)
                {
                    case 1: 
                    return "Lan Mantear";
                    case 2:
                    return "Yumi Rin";
                    case 3:
                    return "Val Phoenix";
                    case 4:
                    return "Shelly Duncan";
                    case 5:
                    return "Thomas Silverstar";
                    default:
                    return "";
                } 
                           
            }

        }
        public class xItemDrop
        {

            [PrimaryKey, AutoIncrement]
            public long Id { get; set; }
            public string dateFormatted{ get; set; }
            public string floor{ get; set;}
            public string name{ get; set;}
            public string equipment{ get; set;}
            public string equipmentupgrade{ get; set;}
            public string tomestone{ get; set;}
            public string weapon{ get; set;}
            public string weaponupgrade{ get; set;}

        }

        public class Equipment
        {
            public string name { get; set;}
        }
        public class EquipmentUpgrade
        {
            public string name { get; set;}
        }
        public class Weapon
        {
            public string name { get; set;}
        }
        public class WeaponUpgrade
        {
            public string name { get; set;}
        }
    }
}