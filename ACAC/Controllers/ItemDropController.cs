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
        public IEnumerable<profiles> GetProfiles()
        {
            try
            {
                DbHandler Dbh = new DbHandler();
                if (Dbh.TableExists("profiles"))
                {
                    return Dbh.xGetProfiles();
                }
                else {
                    return Enumerable.Empty<profiles>();
                }
            }
            catch {return Enumerable.Empty<profiles>();}
        }

        [HttpGet("[action]")]
        public IEnumerable<xItemDrop> xItemDrops()
        {

            DbHandler Dbh = new DbHandler();
            return Dbh.GetItemDrops();
        }
        [HttpGet("[action]")]
        public IEnumerable<xItemDropArchive> xItemDropArchives()
        {
            DbHandler Dbh = new DbHandler();
            return Dbh.GetItemDropArchive();
        }
        [HttpGet("[action]")]
        public IEnumerable<xItemDrop> GetRecentItemDrops()
        {
            DbHandler Dbh = new DbHandler();
            return Dbh.GetRecentItemDrops();
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
        public IActionResult saveProfiles([FromBody] profiles[] _profiles)
        {
            if (_profiles == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            foreach(profiles p in _profiles)
            {
                DbHandler Dbh = new DbHandler();
                Dbh.InsertUpdateProfile(p);               
            }
            return Ok();
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
                        case "Deepshadow Coating":
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
                        case "Deepshadow Twine":
                            if (Dbh.GetFloor3_EquipmentUpgrade().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor3_EquipmentUpgrade { raider = x.raider }); }
                            break;
                        case "Deepshadow Solvent":
                            if (Dbh.GetFloor3_WeaponUpgrade().Count(p => p.raider == x.raider) == 0)
                            { Dbh.AddRoundRobin(new Floor3_WeaponUpgrade { raider = x.raider }); }
                            break;
                    }
                    break;
                case "Eden Savage Floor 4":
                    switch (x.droptype)
                    {
                        case "Chest Coffer":
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
        [HttpPost("[action]")]
        public IActionResult DeleteItemById([FromBody] string id)
        {
            DbHandler Dbh = new DbHandler();
            if (Dbh.TableExists("xItemDropArchive"))
            {
                Dbh.DeleteItemByID(id);
            }
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult OverrideList([FromBody] Overridelist RaiderList)
        {
            DbHandler Dbh = new DbHandler();
            switch (RaiderList.listtype)
            {
                case "Floor1_Equipment":
                    List<Floor1_Equipment> li = new List<Floor1_Equipment>
                    {
                        new Floor1_Equipment { raider = "Lan Mantear" },
                        new Floor1_Equipment { raider = "Hades Carmine" },
                        new Floor1_Equipment { raider = "Yumi Rin" },
                        new Floor1_Equipment { raider = "Aerilyn Elessedil" },
                        new Floor1_Equipment { raider = "Shelly Duncan" },
                        new Floor1_Equipment { raider = "Thomas Silverstar" },
                        new Floor1_Equipment { raider = "Val Phoenix" },
                        new Floor1_Equipment { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li.Single(r => r.raider == x);
                            li.Remove(itemToRemove);
                        }
                        catch {
                        }
                    }

                    Dbh.ResetTable("Floor1_Equipment");
                    foreach (Floor1_Equipment eq in li)
                    {
                        Dbh.AddRoundRobin(new Floor1_Equipment { raider = eq.raider });
                    }
                    break;

                case "Floor2_Equipment":
                    List<Floor2_Equipment> li2 = new List<Floor2_Equipment>
                    {
                        new Floor2_Equipment { raider = "Lan Mantear" },
                        new Floor2_Equipment { raider = "Hades Carmine" },
                        new Floor2_Equipment { raider = "Yumi Rin" },
                        new Floor2_Equipment { raider = "Aerilyn Elessedil" },
                        new Floor2_Equipment { raider = "Shelly Duncan" },
                        new Floor2_Equipment { raider = "Thomas Silverstar" },
                        new Floor2_Equipment { raider = "Val Phoenix" },
                        new Floor2_Equipment { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li2.Single(r => r.raider == x);
                            li2.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor2_Equipment");
                    foreach (Floor2_Equipment eq in li2)
                    {
                        Dbh.AddRoundRobin(new Floor2_Equipment { raider = eq.raider });
                    }
                    break;

                case "Floor2_EquipmentUpgrade":
                    List<Floor2_EquipmentUpgrade> li3 = new List<Floor2_EquipmentUpgrade>
                    {
                        new Floor2_EquipmentUpgrade { raider = "Lan Mantear" },
                        new Floor2_EquipmentUpgrade { raider = "Hades Carmine" },
                        new Floor2_EquipmentUpgrade { raider = "Yumi Rin" },
                        new Floor2_EquipmentUpgrade { raider = "Aerilyn Elessedil" },
                        new Floor2_EquipmentUpgrade { raider = "Shelly Duncan" },
                        new Floor2_EquipmentUpgrade { raider = "Thomas Silverstar" },
                        new Floor2_EquipmentUpgrade { raider = "Val Phoenix" },
                        new Floor2_EquipmentUpgrade { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li3.Single(r => r.raider == x);
                            li3.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor2_EquipmentUpgrade");
                    foreach (Floor2_EquipmentUpgrade eq in li3)
                    {
                        Dbh.AddRoundRobin(new Floor2_EquipmentUpgrade { raider = eq.raider });
                    }
                    break;
                case "Floor3_Equipment":
                    List<Floor3_Equipment> li4 = new List<Floor3_Equipment>
                    {
                        new Floor3_Equipment { raider = "Lan Mantear" },
                        new Floor3_Equipment { raider = "Hades Carmine" },
                        new Floor3_Equipment { raider = "Yumi Rin" },
                        new Floor3_Equipment { raider = "Aerilyn Elessedil" },
                        new Floor3_Equipment { raider = "Shelly Duncan" },
                        new Floor3_Equipment { raider = "Thomas Silverstar" },
                        new Floor3_Equipment { raider = "Val Phoenix" },
                        new Floor3_Equipment { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li4.Single(r => r.raider == x);
                            li4.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor3_Equipment");
                    foreach (Floor3_Equipment eq in li4)
                    {
                        Dbh.AddRoundRobin(new Floor3_Equipment { raider = eq.raider });
                    }
                    break;
                case "Floor3_EquipmentUpgrade":
                    List<Floor3_EquipmentUpgrade> li5 = new List<Floor3_EquipmentUpgrade>
                    {
                        new Floor3_EquipmentUpgrade { raider = "Lan Mantear" },
                        new Floor3_EquipmentUpgrade { raider = "Hades Carmine" },
                        new Floor3_EquipmentUpgrade { raider = "Yumi Rin" },
                        new Floor3_EquipmentUpgrade { raider = "Aerilyn Elessedil" },
                        new Floor3_EquipmentUpgrade { raider = "Shelly Duncan" },
                        new Floor3_EquipmentUpgrade { raider = "Thomas Silverstar" },
                        new Floor3_EquipmentUpgrade { raider = "Val Phoenix" },
                        new Floor3_EquipmentUpgrade { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li5.Single(r => r.raider == x);
                            li5.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor3_EquipmentUpgrade");
                    foreach (Floor3_EquipmentUpgrade eq in li5)
                    {
                        Dbh.AddRoundRobin(new Floor3_EquipmentUpgrade { raider = eq.raider });
                    }
                    break;
                case "Floor3_WeaponUpgrade":
                    List<Floor3_WeaponUpgrade> li6 = new List<Floor3_WeaponUpgrade>
                    {
                        new Floor3_WeaponUpgrade { raider = "Lan Mantear" },
                        new Floor3_WeaponUpgrade { raider = "Hades Carmine" },
                        new Floor3_WeaponUpgrade { raider = "Yumi Rin" },
                        new Floor3_WeaponUpgrade { raider = "Aerilyn Elessedil" },
                        new Floor3_WeaponUpgrade { raider = "Shelly Duncan" },
                        new Floor3_WeaponUpgrade { raider = "Thomas Silverstar" },
                        new Floor3_WeaponUpgrade { raider = "Val Phoenix" },
                        new Floor3_WeaponUpgrade { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li6.Single(r => r.raider == x);
                            li6.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor3_WeaponUpgrade");
                    foreach (Floor3_WeaponUpgrade eq in li6)
                    {
                        Dbh.AddRoundRobin(new Floor3_WeaponUpgrade { raider = eq.raider });
                    }
                    break;
                case "Floor4_Equipment":
                    List<Floor4_Equipment> li7 = new List<Floor4_Equipment>
                    {
                        new Floor4_Equipment { raider = "Lan Mantear" },
                        new Floor4_Equipment { raider = "Hades Carmine" },
                        new Floor4_Equipment { raider = "Yumi Rin" },
                        new Floor4_Equipment { raider = "Aerilyn Elessedil" },
                        new Floor4_Equipment { raider = "Shelly Duncan" },
                        new Floor4_Equipment { raider = "Thomas Silverstar" },
                        new Floor4_Equipment { raider = "Val Phoenix" },
                        new Floor4_Equipment { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li7.Single(r => r.raider == x);
                            li7.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor4_Equipment");
                    foreach (Floor4_Equipment eq in li7)
                    {
                        Dbh.AddRoundRobin(new Floor4_Equipment { raider = eq.raider });
                    }
                    break;
                case "Floor4_WeaponCoffer":
                    List<Floor4_WeaponCoffer> li8 = new List<Floor4_WeaponCoffer>
                    {
                        new Floor4_WeaponCoffer { raider = "Lan Mantear" },
                        new Floor4_WeaponCoffer { raider = "Hades Carmine" },
                        new Floor4_WeaponCoffer { raider = "Yumi Rin" },
                        new Floor4_WeaponCoffer { raider = "Aerilyn Elessedil" },
                        new Floor4_WeaponCoffer { raider = "Shelly Duncan" },
                        new Floor4_WeaponCoffer { raider = "Thomas Silverstar" },
                        new Floor4_WeaponCoffer { raider = "Val Phoenix" },
                        new Floor4_WeaponCoffer { raider = "La Ki" }
                    };

                    foreach (string x in RaiderList.raiders.Split(','))
                    {
                        try
                        {
                            var itemToRemove = li8.Single(r => r.raider == x);
                            li8.Remove(itemToRemove);
                        }
                        catch
                        {
                        }
                    }

                    Dbh.ResetTable("Floor4_WeaponCoffer");
                    foreach (Floor4_WeaponCoffer eq in li8)
                    {
                        Dbh.AddRoundRobin(new Floor4_WeaponCoffer { raider = eq.raider });
                    }
                    break;
            }
            return Ok();
        }
        public class DbHandler
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory, "ACAC.db");

            public bool TableExists(string tableName)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    if (Db.ExecuteScalar<int>("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='" + tableName + "'") > 0)
                    {
                        return true;
                    }
                    else
                    {
                        switch (tableName)
                        {
                            case "xItemDropArchive":
                                Db.CreateTable<xItemDropArchive>();
                                return true;
                            case "profiles":
                                Db.CreateTable<profiles>();
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Aerilyn Elessedil" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Hades Carmine" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="La Ki" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Lan Mantear" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Shelly Duncan" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Thomas Silverstar" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Val Phoenix" });
                                Db.Insert(new profiles{ img="assets/img/no-profile.png", name="Yumi Rin" });
                                return true;
                            default:
                                return false;
                        }
                    }
                }
            }
            public IEnumerable<xItemDrop> GetItemDrops()
            {
                IEnumerable<xItemDrop> xDrops;
                try
                {
                    using (var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        xDrops = Db.Query<xItemDrop>("Select * from xItemDrop order by Date(dateReceived) desc, Floor desc");
                    }

                    IEnumerable<profiles> p = xGetProfiles();
                    foreach (xItemDrop x in xDrops)
                    {
                        //var itemToRemove = li8.Single(r => r.raider == x);
                        var profilepic = p.Single(r => r.name == x.raider);
                        x.raider += "," + profilepic.img;

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
                catch
                { return Enumerable.Empty<xItemDrop>(); }
            }
            public IEnumerable<xItemDrop> GetRecentItemDrops()
            {
                try
                {
                    using (var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        return Db.Query<xItemDrop>("Select * From xItemDrop order by Date(dateReceived) desc, Floor desc LIMIT 5");
                    }
                }
                catch
                { return Enumerable.Empty<xItemDrop>(); }
            }
            public IEnumerable<xItemDropArchive> GetItemDropArchive()
            {
                try {
                    using (var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        return Db.Query<xItemDropArchive>("Select * From xItemDropArchive order by Date(dateArchived) desc");
                    }
                }                
                catch { return Enumerable.Empty<xItemDropArchive>(); }                
            }
            public IEnumerable<xItemDrop> GetItemHistoryByRaider(string xRaider)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<xItemDrop>("Select * From xItemDrop where raider='" + xRaider + "' order by Date(dateReceived) desc, Floor desc");
                }
            }
            public void DeleteItemByID(string id)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    IEnumerable<xItemDrop> xids = Db.Query<xItemDrop>("Select * From xItemDrop where id=" + id);
                    foreach (xItemDrop xid in xids)
                    {
                        xItemDropArchive Xida = new xItemDropArchive
                        {
                            dateArchived = DateTime.Now.ToString(),
                            dateReceived = xid.dateReceived,
                            droptype = xid.droptype,
                            floor = xid.floor,
                            Id = xid.Id,
                            raider =  xid.raider
                        };
                        Db.Insert(Xida);
                        Db.Execute("Delete from xItemDrop where id=" + id);
                    }                    
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
                List<Floor4_WeaponCoffer> li = new List<Floor4_WeaponCoffer>();
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
            public void InsertUpdateProfile(profiles _p)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.InsertOrReplace(_p);
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
                        Db.CreateTable<xItemDrop>();
                        Db.CreateTable<Floor1_Equipment>();
                        Db.CreateTable<Floor2_Equipment>();
                        Db.CreateTable<Floor2_EquipmentUpgrade>();
                        Db.CreateTable<Floor3_Equipment>();
                        Db.CreateTable<Floor3_EquipmentUpgrade>();
                        Db.CreateTable<Floor3_WeaponUpgrade>();
                        Db.CreateTable<Floor4_Equipment>();
                        Db.CreateTable<Floor4_WeaponCoffer>();
                    }
                }
                else
                {
                    using (var Db = new SQLite.SQLiteConnection(DbPath))
                    {
                        switch (tableName)
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
            public IEnumerable<profiles> xGetProfiles()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<profiles>("Select * from profiles");
                }
            }
        }
        public class xItemDrop
        {
            [PrimaryKey, AutoIncrement]
            public long Id { get; set; }
            public string dateReceived { get; set; }
            public string floor { get; set; }
            public string raider { get; set; }
            public string droptype { get; set; }
        }
        public class xItemDropArchive
        {
            [PrimaryKey, AutoIncrement]
            public long Id { get; set; }
            public string dateReceived { get; set; }
            public string floor { get; set; }
            public string raider { get; set; }
            public string droptype { get; set; }
            public string dateArchived { get; set; }
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
        public class Overridelist
        {
            public string listtype { get; set; }
            public string raiders { get; set; }
        }
        public class profiles
        {
            public string img { get; set; }
            [PrimaryKey]
            public string name { get; set;}
        }
    }
}