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
        public IEnumerable<xItemDrop> ItemHistoryByRaider(string xRaider)
        {
            DbHandler Dbh = new DbHandler();
            return Dbh.GetItemHistoryByRaider(xRaider);
        }

        [HttpGet("[action]")]
        public IEnumerable<Floor1_Equipment> xFloor1_Equipment()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor1_EquipmentRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor1_Equipment");
            }
            return Dbh.CurrentFloor1_EquipmentRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor2_Equipment> xFloor2_Equipment()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor2_EquipmentRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor2_Equipment");
            }
            return Dbh.CurrentFloor2_EquipmentRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor2_EquipmentUpgrade> xFloor2_EquipmentUpgrade()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor2_EquipmentUpgradeRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor2_EquipmentUpgrade");
            }
            return Dbh.CurrentFloor2_EquipmentUpgradeRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor3_Equipment> xFloor3_Equipment()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor3_EquipmentRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor3_Equipment");
            }
            return Dbh.CurrentFloor3_EquipmentRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor3_EquipmentUpgrade> xFloor3_EquipmentUpgrade()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor3_EquipmentUpgradeRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor3_EquipmentUpgrade");
            }
            return Dbh.CurrentFloor3_EquipmentUpgradeRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor3_WeaponUpgrade> xFloor3_WeaponUpgrade()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor3_WeaponUpgradeRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor3_WeaponUpgrade");
            }
            return Dbh.CurrentFloor3_WeaponUpgradeRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor4_Equipment> xFloor4_Equipment()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor4_EquipmentRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor4_Equipment");
            }
            return Dbh.CurrentFloor4_EquipmentRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Floor4_WeaponCoffer> xFloor4_WeaponCoffer()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentFloor4_WeaponCofferRaiders().Count() == 0)
            {
                Dbh.ResetTable("Floor4_WeaponCoffer");
            }
            return Dbh.CurrentFloor4_WeaponCofferRaiders();
        }
    
        [HttpPost("[action]")]
        public IActionResult addDrop([FromBody] xItemDrop x)
        {
            
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");

            DbHandler Dbh = new DbHandler();
            Dbh.AddItemDrop(x);

            switch (x.floor)
            {
                case "Eden Savage Floor 1":
                    if (Dbh.GetFloor1_Equipment().Count(p => p.raider == x.raider) == 0)
                    {
                       Dbh.AddRoundRobin(new Floor1_Equipment { raider = x.raider });
                    }
                    break;
                case "Eden Savage Floor 2":
                    switch (x.droptype)
                    {
                        case "Equipment Coffer":
                            if (Dbh.GetFloor2_Equipment().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor2_Equipment { raider = x.raider }); }
                            break;
                        case "Equipment Upgrade":
                            if (Dbh.GetFloor2_EquipmentUpgrade().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor2_EquipmentUpgrade { raider = x.raider }); }
                            break;
                    }
                    break;
                case "Eden Savage Floor 3":
                    switch (x.droptype)
                    {
                        case "Equipment Coffer":
                            if (Dbh.GetFloor3_Equipment().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor3_Equipment { raider = x.raider }); }
                            break;
                        case "Equipment Upgrade":
                            if (Dbh.GetFloor3_EquipmentUpgrade().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor3_EquipmentUpgrade { raider = x.raider }); }
                            break;
                        case "Weapon upgrade":
                            if (Dbh.GetFloor3_WeaponUpgrade().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor3_WeaponUpgrade { raider = x.raider }); }
                            break;
                    }
                    break;
                case "Eden Savage Floor 4":
                    switch (x.droptype)
                    {
                        case "Equipment Coffer":
                            if (Dbh.GetFloor4_Equipment().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor4_Equipment { raider = x.raider }); }
                            break;
                        case "Weapon Coffer":
                            if (Dbh.GetFloor4_WeaponCoffer().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor4_WeaponCoffer { raider = x.raider }); }
                            break;
                    }
                    break;
            }
           
            return Ok();

        }

        [HttpPost("[action]")]
        public IActionResult ResetDb([FromBody]string xFloor)
        {
            DbHandler Dbh = new DbHandler();
            Dbh.ResetTable(xFloor);
            return Ok();
        }

        public class DbHandler
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory,"ACAC.db");
           
            public IEnumerable<xItemDrop> GetItemDrops()
            {
                IEnumerable<xItemDrop> xDrops;
                using ( var Db = new SQLite.SQLiteConnection(DbPath))
                {
                     xDrops = Db.Query<xItemDrop>("Select * from xItemDrop order by Date(dateReceived) desc, Floor desc");
                }

                foreach(xItemDrop x in xDrops)   
                {
                    switch (x.floor)
                    {
                        case "Eden Savage Floor 1":
                            x.floor = "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/65-icon.jpg";
                            break;
                        case "Eden Savage Floor 2":
                            x.floor = "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/66-icon.jpg";
                            break;
                        case "Eden Savage Floor 3":
                            x.floor = "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/67-icon.jpg";
                            break;
                        case "Eden Savage Floor 4":
                            x.floor = "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/68-icon.jpg";
                            break;    
                    }
                }
                return xDrops;
            }
            public IEnumerable<xItemDrop> GetItemHistoryByRaider(string xRaider)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<xItemDrop>("Select * From xItemDrop where raider='" + xRaider + "' order by Date(dateReceived) desc, Floor desc");
                }
            }
            public void AddItemDrop(xItemDrop xItem)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(xItem);  
                }
                     
            }

            public IEnumerable<Floor1_Equipment> CurrentFloor1_EquipmentRaiders()
            {
                List<Floor1_Equipment> li = new List<Floor1_Equipment>();
                li.Add(new Floor1_Equipment { raider = "Lan Mantear" });
                li.Add(new Floor1_Equipment { raider = "Hades Carmine" });
                li.Add(new Floor1_Equipment { raider = "Yumi Rin" });
                li.Add(new Floor1_Equipment { raider = "Aerilyn Elessedil" });
                li.Add(new Floor1_Equipment { raider = "Shelly Duncan" });
                li.Add(new Floor1_Equipment { raider = "Thomas Silverstar" });
                li.Add(new Floor1_Equipment { raider = "Val Phoenix" });
                li.Add(new Floor1_Equipment { raider = "La Ki" });

                foreach (Floor1_Equipment eq in GetFloor1_Equipment())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor2_Equipment> CurrentFloor2_EquipmentRaiders()
            {
                List<Floor2_Equipment> li = new List<Floor2_Equipment>();
                li.Add(new Floor2_Equipment { raider = "Lan Mantear" });
                li.Add(new Floor2_Equipment { raider = "Hades Carmine" });
                li.Add(new Floor2_Equipment { raider = "Yumi Rin" });
                li.Add(new Floor2_Equipment { raider = "Aerilyn Elessedil" });
                li.Add(new Floor2_Equipment { raider = "Shelly Duncan" });
                li.Add(new Floor2_Equipment { raider = "Thomas Silverstar" });
                li.Add(new Floor2_Equipment { raider = "Val Phoenix" });
                li.Add(new Floor2_Equipment { raider = "La Ki" });

                foreach (Floor2_Equipment eq in GetFloor2_Equipment())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor2_EquipmentUpgrade> CurrentFloor2_EquipmentUpgradeRaiders()
            {
                List<Floor2_EquipmentUpgrade> li = new List<Floor2_EquipmentUpgrade>();
                li.Add(new Floor2_EquipmentUpgrade { raider = "Lan Mantear" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Hades Carmine" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Yumi Rin" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Aerilyn Elessedil" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Shelly Duncan" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Thomas Silverstar" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "Val Phoenix" });
                li.Add(new Floor2_EquipmentUpgrade { raider = "La Ki" });

                foreach (Floor2_EquipmentUpgrade eq in GetFloor2_EquipmentUpgrade())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor3_Equipment> CurrentFloor3_EquipmentRaiders()
            {
                List<Floor3_Equipment> li = new List<Floor3_Equipment>();
                li.Add(new Floor3_Equipment { raider = "Lan Mantear" });
                li.Add(new Floor3_Equipment { raider = "Hades Carmine" });
                li.Add(new Floor3_Equipment { raider = "Yumi Rin" });
                li.Add(new Floor3_Equipment { raider = "Aerilyn Elessedil" });
                li.Add(new Floor3_Equipment { raider = "Shelly Duncan" });
                li.Add(new Floor3_Equipment { raider = "Thomas Silverstar" });
                li.Add(new Floor3_Equipment { raider = "Val Phoenix" });
                li.Add(new Floor3_Equipment { raider = "La Ki" });

                foreach (Floor3_Equipment eq in GetFloor3_Equipment())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor3_EquipmentUpgrade> CurrentFloor3_EquipmentUpgradeRaiders()
            {
                List<Floor3_EquipmentUpgrade> li = new List<Floor3_EquipmentUpgrade>();
                li.Add(new Floor3_EquipmentUpgrade { raider = "Lan Mantear" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Hades Carmine" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Yumi Rin" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Aerilyn Elessedil" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Shelly Duncan" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Thomas Silverstar" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "Val Phoenix" });
                li.Add(new Floor3_EquipmentUpgrade { raider = "La Ki" });

                foreach (Floor3_EquipmentUpgrade eq in GetFloor3_EquipmentUpgrade())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor3_WeaponUpgrade> CurrentFloor3_WeaponUpgradeRaiders()
            {
                List<Floor3_WeaponUpgrade> li = new List<Floor3_WeaponUpgrade>();
                li.Add(new Floor3_WeaponUpgrade { raider = "Lan Mantear" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Hades Carmine" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Yumi Rin" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Aerilyn Elessedil" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Shelly Duncan" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Thomas Silverstar" });
                li.Add(new Floor3_WeaponUpgrade { raider = "Val Phoenix" });
                li.Add(new Floor3_WeaponUpgrade { raider = "La Ki" });

                foreach (Floor3_WeaponUpgrade eq in GetFloor3_WeaponUpgrade())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor4_Equipment> CurrentFloor4_EquipmentRaiders()
            {
                List<Floor4_Equipment> li = new List<Floor4_Equipment>();
                li.Add(new Floor4_Equipment { raider = "Lan Mantear" });
                li.Add(new Floor4_Equipment { raider = "Hades Carmine" });
                li.Add(new Floor4_Equipment { raider = "Yumi Rin" });
                li.Add(new Floor4_Equipment { raider = "Aerilyn Elessedil" });
                li.Add(new Floor4_Equipment { raider = "Shelly Duncan" });
                li.Add(new Floor4_Equipment { raider = "Thomas Silverstar" });
                li.Add(new Floor4_Equipment { raider = "Val Phoenix" });
                li.Add(new Floor4_Equipment { raider = "La Ki" });

                foreach (Floor4_Equipment eq in GetFloor4_Equipment())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Floor4_WeaponCoffer> CurrentFloor4_WeaponCofferRaiders()
            {
                List<Floor4_WeaponCoffer> li = new List<Floor4_WeaponCoffer> ();
                li.Add(new Floor4_WeaponCoffer { raider = "Lan Mantear" });
                li.Add(new Floor4_WeaponCoffer { raider = "Hades Carmine" });
                li.Add(new Floor4_WeaponCoffer { raider = "Yumi Rin" });
                li.Add(new Floor4_WeaponCoffer { raider = "Aerilyn Elessedil" });
                li.Add(new Floor4_WeaponCoffer { raider = "Shelly Duncan" });
                li.Add(new Floor4_WeaponCoffer { raider = "Thomas Silverstar" });
                li.Add(new Floor4_WeaponCoffer { raider = "Val Phoenix" });
                li.Add(new Floor4_WeaponCoffer { raider = "La Ki" });

                foreach (Floor4_WeaponCoffer eq in GetFloor4_WeaponCoffer())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }

            public void AddRoundRobin(object ItemX)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(ItemX);
                }
            }

            public void ResetTable(string tableName)
            {
                if (tableName == "hardreset")
                {

                    if (System.IO.File.Exists(DbPath))
                    {
                        System.IO.File.Delete(DbPath);
                    }
                    using (var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        Db.CreateTable<ACAC.Controllers.ItemDropController.xItemDrop>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor1_Equipment>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor2_Equipment>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor2_EquipmentUpgrade>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_Equipment>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_EquipmentUpgrade>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor3_WeaponUpgrade>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor4_Equipment>();
                        Db.CreateTable<ACAC.Controllers.ItemDropController.Floor4_WeaponCoffer>();
                    }
                }
                else
                {
                    using(var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        switch(tableName)
                        {
                            case "ALL":
                                Db.Execute("Delete From Equipment");
                                Db.Execute("Delete from EquipmentUpgrade");
                                Db.Execute("Delete from Weapon");
                                Db.Execute("Delete from WeaponUpgrade");
                                Db.Execute("Delete from xItemDrop");
                                break;
                            default:
                                Db.Execute("Delete From " + tableName);
                                break;
                        }
                    }
                }
                
            }


            public IEnumerable<Floor1_Equipment> GetFloor1_Equipment()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor1_Equipment>("Select * from Floor1_Equipment");
                }
            }
            public IEnumerable<Floor2_Equipment> GetFloor2_Equipment()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor2_Equipment>("Select * from Floor2_Equipment");
                }
            }
            public IEnumerable<Floor2_EquipmentUpgrade> GetFloor2_EquipmentUpgrade()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor2_EquipmentUpgrade>("Select * from Floor2_EquipmentUpgrade");
                }
            }
            public IEnumerable<Floor3_Equipment> GetFloor3_Equipment()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor3_Equipment>("Select * from Floor3_Equipment");
                }
            }
            public IEnumerable<Floor3_EquipmentUpgrade> GetFloor3_EquipmentUpgrade()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor3_EquipmentUpgrade>("Select * from Floor3_EquipmentUpgrade");
                }
            }
            public IEnumerable<Floor3_WeaponUpgrade> GetFloor3_WeaponUpgrade()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor3_WeaponUpgrade>("Select * from Floor3_WeaponUpgrade");
                }
            }
            public IEnumerable<Floor4_Equipment> GetFloor4_Equipment()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor4_Equipment>("Select * from Floor4_Equipment");
                }
            }
            public IEnumerable<Floor4_WeaponCoffer> GetFloor4_WeaponCoffer()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Floor4_WeaponCoffer>("Select * from Floor4_WeaponCoffer");
                }
            }

        }

        public class xItemDrop
        {
            [PrimaryKey, AutoIncrement]
            public long Id { get; set; }
            public string dateReceived { get; set; }
            public string floor{ get; set;}
            public string raider { get; set;}
            public string droptype { get; set;}
        }
        public class Floor1_Equipment
        {
            public string raider { get; set; }
        }
        public class Floor2_Equipment
        {
            public string raider { get; set; }
        }
        public class Floor2_EquipmentUpgrade
        {
            public string raider { get; set; }
        }
        public class Floor3_Equipment
        {
            public string raider { get; set; }
        }
        public class Floor3_EquipmentUpgrade
        {
            public string raider { get; set; }
        }
        public class Floor3_WeaponUpgrade
        {
            public string raider { get; set; }
        }
        public class Floor4_Equipment
        {
            public string raider { get; set; }
        }
        public class Floor4_WeaponCoffer
        {
            public string raider { get; set; }
        }
    }
}