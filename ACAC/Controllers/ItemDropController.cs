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
            if (Dbh.CurrentEquipRaiders().Count() == 0)
            {
                Dbh.ResetTable("Equipment Coffer");
            }
            return Dbh.CurrentEquipRaiders();     
        }
        [HttpGet("[action]")]
        public IEnumerable<EquipmentUpgrade> xEquipmentUpgradeDrops()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentEquipUpgradeRaiders().Count() == 0)
            {
                Dbh.ResetTable("Equipment Upgrade");
            }
            return Dbh.CurrentEquipUpgradeRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<Weapon> xWeaponDrops()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentWeaponRaiders().Count() == 0)
            {
                Dbh.ResetTable("Weapon Coffer");
            }
            return Dbh.CurrentWeaponRaiders();
        }
        [HttpGet("[action]")]
        public IEnumerable<WeaponUpgrade> xWeaponUpgradeDrops()
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.CurrentWeaponUpgradeRaiders().Count() == 0)
            {
                Dbh.ResetTable("Weapon Upgrade");
            }
            return Dbh.CurrentWeaponUpgradeRaiders();
        }
        [HttpPost("[action]")]
        public IActionResult addDrop([FromBody] xItemDrop x)
        {
            
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");

            DbHandler Dbh = new DbHandler();
            Dbh.AddItemDrop(x);

            switch(x.droptype)
            {
                case "Equipment Coffer":
                    Dbh.AddRoundRobin(new Equipment { raider = x.raider });  
                    break;
                case "Equipment Upgrade":
                    Dbh.AddRoundRobin(new EquipmentUpgrade { raider = x.raider });  
                    break;
                case "Weapon Coffer":
                    Dbh.AddRoundRobin(new Weapon { raider = x.raider });
                    break;
                case "Weapon Upgrade":
                    Dbh.AddRoundRobin(new WeaponUpgrade { raider = x.raider });  
                    break;
            }

            return Ok();

        }
        
  
        public class DbHandler
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory,"ACAC.db");
           
            public IEnumerable<xItemDrop> GetItemDrops()
            {
                using ( var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<xItemDrop>("Select * from xItemDrop order by Date(dateReceived) desc");
                }
                      
            }

            public IEnumerable<Equipment> GetEquipmentDrops()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Equipment>("Select * from Equipment");
                }
                    
            }
            public IEnumerable<EquipmentUpgrade> GetEquipmentUpgradeDrops()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<EquipmentUpgrade>("Select * from EquipmentUpgrade");
                }

            }
            public IEnumerable<Weapon> GetWeaponDrops()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Weapon>("Select * from Weapon");
                }

            }
            public IEnumerable<WeaponUpgrade> GetWeaponUpgradeDrops()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<WeaponUpgrade>("Select * from WeaponUpgrade");
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
           
            public IEnumerable<Equipment> CurrentEquipRaiders()
            {
                List<Equipment> li = new List<Equipment>();
                li.Add(new Equipment { raider = "Lan Mantear" });
                li.Add(new Equipment { raider = "Hades Carmine" });
                li.Add(new Equipment { raider = "Yumi Rin" });
                li.Add(new Equipment { raider = "Aerilyn Elessedil" });
                li.Add(new Equipment { raider = "Shelly Duncan" });
                li.Add(new Equipment { raider = "Thomas Silverstar" });
                li.Add(new Equipment { raider = "Val Phoenix" });
                li.Add(new Equipment { raider = "La Ki" });

                foreach (Equipment eq in GetEquipmentDrops())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider) ;
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<EquipmentUpgrade> CurrentEquipUpgradeRaiders()
            {
                List<EquipmentUpgrade> li = new List<EquipmentUpgrade>();
                li.Add(new EquipmentUpgrade { raider = "Lan Mantear" });
                li.Add(new EquipmentUpgrade { raider = "Hades Carmine" });
                li.Add(new EquipmentUpgrade { raider = "Yumi Rin" });
                li.Add(new EquipmentUpgrade { raider = "Aerilyn Elessedil" });
                li.Add(new EquipmentUpgrade { raider = "Shelly Duncan" });
                li.Add(new EquipmentUpgrade { raider = "Thomas Silverstar" });
                li.Add(new EquipmentUpgrade { raider = "Val Phoenix" });
                li.Add(new EquipmentUpgrade { raider = "La Ki" });

                foreach (EquipmentUpgrade eq in GetEquipmentUpgradeDrops())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<Weapon> CurrentWeaponRaiders()
            {
                List<Weapon> li = new List<Weapon>();
                li.Add(new Weapon { raider = "Lan Mantear" });
                li.Add(new Weapon { raider = "Hades Carmine" });
                li.Add(new Weapon { raider = "Yumi Rin" });
                li.Add(new Weapon { raider = "Aerilyn Elessedil" });
                li.Add(new Weapon { raider = "Shelly Duncan" });
                li.Add(new Weapon { raider = "Thomas Silverstar" });
                li.Add(new Weapon { raider = "Val Phoenix" });
                li.Add(new Weapon { raider = "La Ki" });

                foreach (Weapon eq in GetWeaponDrops())
                {
                    var itemToRemove = li.Single(r => r.raider == eq.raider);
                    li.Remove(itemToRemove);
                }

                return li;
            }
            public IEnumerable<WeaponUpgrade> CurrentWeaponUpgradeRaiders()
            {
                List<WeaponUpgrade> li = new List<WeaponUpgrade>();
                li.Add(new WeaponUpgrade { raider = "Lan Mantear" });
                li.Add(new WeaponUpgrade { raider = "Hades Carmine" });
                li.Add(new WeaponUpgrade { raider = "Yumi Rin" });
                li.Add(new WeaponUpgrade { raider = "Aerilyn Elessedil" });
                li.Add(new WeaponUpgrade { raider = "Shelly Duncan" });
                li.Add(new WeaponUpgrade { raider = "Thomas Silverstar" });
                li.Add(new WeaponUpgrade { raider = "Val Phoenix" });
                li.Add(new WeaponUpgrade { raider = "La Ki" });

                foreach (WeaponUpgrade eq in GetWeaponUpgradeDrops())
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
                using(var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    switch(tableName)
                    {
                        case "Equipment Coffer":
                            Db.Execute("Delete From Equipment");
                            break;
                        case "Equipment Upgrade":
                            Db.Execute("Delete from EquipmentUpgrade");
                            break;
                        case "Weapon Coffer":
                            Db.Execute("Delete from Weapon");
                            break;
                        case "Weapon Upgrade":
                            Db.Execute("Delete from WeaponUpgrade");
                            break;
                    }
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

        public class Equipment
        {
            public string raider { get; set;}
        }
        public class EquipmentUpgrade
        {
            public string raider { get; set;}
        }
        public class Weapon
        {
            public string raider { get; set;}
        }
        public class WeaponUpgrade
        {
            public string raider { get; set;}
        }

        
    }
}