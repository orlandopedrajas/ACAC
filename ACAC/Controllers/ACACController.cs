using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SQLite;

namespace ACAC.Controllers
{
    [Route("api/[controller]")]
    public class ACACController : Controller
    {

    #region "API Entrypoints"

        #region "Profiles"

        [HttpGet("[action]")]
        public IEnumerable<profile> GetAllProfiles()
        {
            try
            {
                Databasehandler Dbh = new Databasehandler();
                if (Dbh.TableExists("profile"))
                {
                    return Dbh.GetProfiles();
                }
                else { return Enumerable.Empty<profile>(); }
            }
            catch { return Enumerable.Empty<profile>(); }
        }
        [HttpPost("[action]")]
        public IActionResult saveProfiles([FromBody] profile[] _profile)
        {
            if (_profile == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            foreach (profile p in _profile)
            {
                Databasehandler Dbh = new Databasehandler();
                Dbh.InsertUpdateProfile(p);
            }
            return Ok();
        }

        #endregion

        #region "GET"

        [HttpGet("[action]")]
        public IEnumerable<Archivedraiditem> GetArchivedRaidItems()
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("Archivedraiditem"))
            {
                return Dbh.GetArchivedItems();
            }
            else
            {
                return Enumerable.Empty<Archivedraiditem>();
            }
        }
        [HttpGet("[action]")]
        public IEnumerable<Settings> GetAllSettings()
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("Settings"))
            {
                return Dbh.GetAllSettings();
            }
            else
            {
                return Enumerable.Empty<Settings>();
            }
        }
        [HttpGet("[action]")] 
        public IEnumerable<Settings> GetSettings(string nameSetting)
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("Settings"))
            {
                return Dbh.GetSetting(nameSetting);
            }
            else
            {
                return Enumerable.Empty<Settings>();
            }
        }
        [HttpGet("[action]")]
        public IEnumerable<Customraiditem> GetRecentRaidItems()
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("RaidItem"))
            {
                List<Customraiditem> li = new List<Customraiditem>();

                foreach (RaidItem ri in Dbh.GetRecentRaidItems())
                {
                    li.Add(new Customraiditem
                    {
                        id = ri.id,
                        Profile = Dbh.GetRaiderProfile(ri.raidername).Single(r => r.raidername == ri.raidername),
                        raidername = ri.raidername,
                        RaidfloorImage = GetFloorImage(ri.Raidfloorname),
                        Raidfloorname = ri.Raidfloorname,
                        raidItem = ri.raidItem,
                        Receiveddate = ri.Receiveddate
                    });
                }
                
                return li;
            }
            else
            {
                return Enumerable.Empty<Customraiditem>();
            }
        }
        [HttpGet("[action]")]
        public IEnumerable<Customraiditem> GetRaidItemsByFloor(string XFloor)
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("RaidItem"))
            {
                List<Customraiditem> li = new List<Customraiditem>();
                foreach (RaidItem ri in Dbh.GetRaidItemsByFloor(XFloor))
                {
                    switch (ri.raidItem)
                        {
                            case "Accessory Coffer":
                                ri.raidItemimage = "https://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/8f/8ff71fec93cc2b3246609c0d140e5ddd4902090f.png?5.08";
                                break;
                            case "Equipment Coffer":
                                ri.raidItemimage = "https://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/8f/8ff71fec93cc2b3246609c0d140e5ddd4902090f.png?5.08";
                                break;
                            case "Deepshadow Coating":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/b/b9/Deepshadow_Coating_Icon.png/64px-Deepshadow_Coating_Icon.png";
                                break;
                            case "Deepshadow Twine":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/e/e8/Deepshadow_Twine_Icon.png/40px-Deepshadow_Twine_Icon.png";
                                break;
                            case "Deepshadow Solvent":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/f/f6/Deepshadow_Solvent_Icon.png/40px-Deepshadow_Solvent_Icon.png";
                                break;
                            case "Chest Coffer":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/0/03/Edengrace_Chest_Gear_Coffer_Icon.png/40px-Edengrace_Chest_Gear_Coffer_Icon.png";
                                break;
                            case "Weapon Coffer":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/f/ff/Edengrace_Weapon_Coffer_Icon.png/40px-Edengrace_Weapon_Coffer_Icon.png";
                                break;
                            default:
                                switch (ri.Raidfloorname)
                                {
                                    case "Eden Savage Floor 1":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/5/5b/Book_of_Resurrection_Icon.png/40px-Book_of_Resurrection_Icon.png";
                                        break;
                                    case "Eden Savage Floor 2":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/c/c6/Book_of_Descent_Icon.png/40px-Book_of_Descent_Icon.png";
                                        break;
                                    case "Eden Savage Floor 3":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/2/20/Book_of_Inundation_Icon.png/40px-Book_of_Inundation_Icon.png";
                                        break;
                                    case "Eden Savage Floor 4":                                        
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/5/5b/Book_of_Sepulture_Icon.png/40px-Book_of_Sepulture_Icon.png";
                                        break;
                                }
                               break;
                        }
                    li.Add(new Customraiditem
                    {
                        id = ri.id,
                        Profile = Dbh.GetRaiderProfile(ri.raidername).Single(r => r.raidername == ri.raidername),
                        raidername = ri.raidername,
                        RaidfloorImage = GetFloorImage(ri.Raidfloorname),
                        Raidfloorname = ri.Raidfloorname,
                        raidItem = ri.raidItem,
                        raidItemimage = ri.raidItemimage,
                        Receiveddate = ri.Receiveddate
                    });
                }
                return li;
            }
            else
            {
                return Enumerable.Empty<Customraiditem>();
            }
        }
        [HttpGet("[action]")]
        public IEnumerable<Customraiditem> GetRaidItems(string XRaider)
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("RaidItem"))
            {
                List<Customraiditem> li = new List<Customraiditem>();
                if (XRaider == null)
                {
                    foreach (RaidItem ri in Dbh.GetAllRaidItems())
                    {
                        switch (ri.raidItem)
                        {
                            case "Accessory Coffer":
                                ri.raidItemimage = "https://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/8f/8ff71fec93cc2b3246609c0d140e5ddd4902090f.png?5.08";
                                break;
                            case "Equipment Coffer":
                                ri.raidItemimage = "https://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/8f/8ff71fec93cc2b3246609c0d140e5ddd4902090f.png?5.08";
                                break;
                            case "Deepshadow Coating":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/b/b9/Deepshadow_Coating_Icon.png/64px-Deepshadow_Coating_Icon.png";
                                break;
                            case "Deepshadow Twine":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/e/e8/Deepshadow_Twine_Icon.png/40px-Deepshadow_Twine_Icon.png";
                                break;
                            case "Deepshadow Solvent":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/f/f6/Deepshadow_Solvent_Icon.png/40px-Deepshadow_Solvent_Icon.png";
                                break;
                            case "Chest Coffer":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/0/03/Edengrace_Chest_Gear_Coffer_Icon.png/40px-Edengrace_Chest_Gear_Coffer_Icon.png";
                                break;
                            case "Weapon Coffer":
                                ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/f/ff/Edengrace_Weapon_Coffer_Icon.png/40px-Edengrace_Weapon_Coffer_Icon.png";
                                break;
                            default:
                                switch (ri.Raidfloorname)
                                {
                                    case "Eden Savage Floor 1":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/5/5b/Book_of_Resurrection_Icon.png/40px-Book_of_Resurrection_Icon.png";
                                        break;
                                    case "Eden Savage Floor 2":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/c/c6/Book_of_Descent_Icon.png/40px-Book_of_Descent_Icon.png";
                                        break;
                                    case "Eden Savage Floor 3":
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/2/20/Book_of_Inundation_Icon.png/40px-Book_of_Inundation_Icon.png";
                                        break;
                                    case "Eden Savage Floor 4":                                        
                                        ri.raidItemimage = "https://ffxiv.gamerescape.com/w/images/thumb/5/5b/Book_of_Sepulture_Icon.png/40px-Book_of_Sepulture_Icon.png";
                                        break;
                                }
                               break;
                        }
                        li.Add(new Customraiditem
                        {
                            id = ri.id,
                            Profile = Dbh.GetRaiderProfile(ri.raidername).Single(r => r.raidername == ri.raidername),
                            raidername = ri.raidername,
                            RaidfloorImage = GetFloorImage(ri.Raidfloorname),
                            Raidfloorname = ri.Raidfloorname,
                            raidItem = ri.raidItem,
                            raidItemimage = ri.raidItemimage,
                            Receiveddate = ri.Receiveddate
                        });
                    }
                }
                else
                {
                    foreach (RaidItem ri in Dbh.GetRaidItemsByRaider(XRaider))
                    {
                        
                        li.Add(new Customraiditem
                        {
                            id = ri.id,
                            Profile = Dbh.GetRaiderProfile(ri.raidername).Single(r => r.raidername == XRaider),
                            raidername = ri.raidername,
                            RaidfloorImage = GetFloorImage(ri.Raidfloorname),
                            Raidfloorname = ri.Raidfloorname,
                            raidItem = ri.raidItem,
                            Receiveddate = ri.Receiveddate
                        });
                    }
                }
                return li;
            }
            else
            {
                return Enumerable.Empty<Customraiditem>();
            }
        }
        [HttpGet("[action]")]
        public IEnumerable<Displayroundrobinentry> GetRoundRobinList(string XRaidfloorname)
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("RoundrobinEntry"))
            {
                List<Displayroundrobinentry> li = new List<Displayroundrobinentry>();
                IEnumerable <RoundrobinEntry> rres = Dbh.GetRoundRobin(XRaidfloorname);

                foreach (profile p in Dbh.GetProfiles())
                {
                    li.Add(new Displayroundrobinentry
                    {
                        raider = p,
                        raidername = p.raidername,
                        Raidfloorname = XRaidfloorname,
                        Raiditem = "Other Items"
                    });
                }

                switch (XRaidfloorname)
                {
                    case "Eden Savage Floor 1":
 
                        foreach (profile p in Dbh.GetProfiles())
                        {
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Accessory Coffer"
                            });                            
                        }

                        foreach (RoundrobinEntry re in rres)
                        {
                            var itemToRemove = li.Single(r => r.raidername == re.raidername && r.Raiditem == re.Raiditem);
                            li.Remove(itemToRemove);
                        }

                        return li;
                    case "Eden Savage Floor 2":

                        foreach (profile p in Dbh.GetProfiles())
                        {
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Equipment Coffer"                               
                            });
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Deepshadow Coating"
                            });
                        }
                        foreach (RoundrobinEntry re in rres)
                        {
                            try {
                                var itemToRemove = li.Single(r => r.raidername == re.raidername && r.Raiditem == re.Raiditem);
                                li.Remove(itemToRemove);
                            }
                            catch {}
                        }
                        return li;
                    case "Eden Savage Floor 3":

                        foreach (profile p in Dbh.GetProfiles())
                        {
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Equipment Coffer"
                            });
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Deepshadow Twine"
                            });
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Deepshadow Solvent"
                            });                            
                        }
                        foreach (RoundrobinEntry re in rres)
                        {
                            var itemToRemove = li.Single(r => r.raidername == re.raidername && r.Raiditem == re.Raiditem);
                            li.Remove(itemToRemove);
                        }
                        return li;
                    case "Eden Savage Floor 4":
                        foreach (profile p in Dbh.GetProfiles())
                        {
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Chest Coffer"
                            });
                            li.Add(new Displayroundrobinentry
                            {
                                raider = p,
                                raidername = p.raidername,
                                Raidfloorname = XRaidfloorname,
                                Raiditem = "Weapon Coffer"
                            });
                        }
                        foreach (RoundrobinEntry re in rres)
                        {
                            try {
                                var itemToRemove = li.Single(r => r.raidername == re.raidername && r.Raiditem == re.Raiditem);
                                li.Remove(itemToRemove);
                            }
                            catch {}
                        }
                        return li;
                    default:
                        return li;
                }
            }
            else { return Enumerable.Empty<Displayroundrobinentry>(); }
        }
        [HttpGet("[action]")]
        public genericResponse startLogin(string userName, string password)
        {
            Databasehandler Dbh = new Databasehandler();
            genericResponse g = new genericResponse();
            g.gString = Guid.NewGuid().ToString();
            if (Dbh.Validateuser(userName,password, g.gString))
            {
                return g;
            } else {
                return new genericResponse();
            }
        }
        [HttpGet("[action]")]
        public bool validate(string g)
        {
            Databasehandler Dbh = new Databasehandler();
            return Dbh.validate(g);
        }
        #endregion

        #region "POST"

        [HttpPost("[action]")]
        public IActionResult RoundRobinReset([FromBody] Roundrobinreset XRoundrobinreset)
        {
            Databasehandler Dbh = new Databasehandler();
            List<string> LSraiders = new List<string>(XRoundrobinreset.raiders);
            List<profile> _p = Dbh.GetProfiles().ToList();

            Dbh.ResetRoundRobin(XRoundrobinreset.raiditem, XRoundrobinreset.raidfloorname);
            foreach (string rrr in LSraiders)
            {
                profile p = _p.Single(r => r.raidername == rrr);
                _p.Remove(p);       
            }

            foreach (profile r in _p)
            {
                Dbh.AddRoundRobin(new RoundrobinEntry
                {
                    raidername = r.raidername,
                    Raidfloorname = XRoundrobinreset.raidfloorname,
                    Raiditem = XRoundrobinreset.raiditem
                });
            }
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult addDrop([FromBody] RaidItem x)
        {
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            
            Databasehandler Dbh = new Databasehandler();                      
            Dbh.AddItemDrop(x);

            if (x.raidItem != "Lightweight Tomestone")
            {
                if (Dbh.GetRoundRobin(x.raidItem,x.Raidfloorname).Count(r => r.raidername == x.raidername) == 0)
                {
                    Dbh.AddRoundRobin(new RoundrobinEntry { raidername = x.raidername,
                                                            Raidfloorname = x.Raidfloorname,
                                                            Raiditem = x.raidItem                    
                                                            });
                }
                if (Dbh.GetRoundRobin(x.raidItem, x.Raidfloorname).Count() == 8)
                {
                    Dbh.ResetRoundRobin(x.raidItem, x.Raidfloorname);
                }
            }
           
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult DeleteItemById([FromBody] string id)
        {
            Databasehandler Dbh = new Databasehandler();
            if (Dbh.TableExists("Archivedraiditem"))
            {
                Dbh.DeleteItemByID(id);
            }
            return Ok();
        }

        private string GetFloorImage(string Floorname)
        {
            switch (Floorname)
            {
                case "Eden Savage Floor 1":
                    return "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/65-icon.jpg";
                case "Eden Savage Floor 2":
                    return "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/66-icon.jpg";
                case "Eden Savage Floor 3":
                    return "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/67-icon.jpg";
                case "Eden Savage Floor 4":
                    return "https://dmszsuqyoe6y6.cloudfront.net/img/ff/bosses/68-icon.jpg";
                default:
                    return "assets/img/no-profile.png";
            }
        }

        [HttpPost("[action]")]
        public IActionResult MigrateOldData()
        {
            foreach (Olddb.xItemDrop x in new Olddb().getItemDrops())
            {
                if (x.raider == "La Ki" && x.droptype == "Deepshadow Twine")
                { x.droptype = "Deepshadow Coating"; }
                addDrop(new RaidItem
                {
                    raidername = x.raider,
                    Raidfloorname = x.floor,
                    raidItem = x.droptype,
                    Receiveddate = DateTime.Parse(x.dateReceived)
                });
            }
            return Ok();
        }

        #endregion

    #endregion

        #region "dB Handler"
        public class Olddb
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory, "ACAC.db");

            public IEnumerable<xItemDrop> getItemDrops()
            {
                using(var Db = new SQLiteConnection(DbPath))
                {
                    return Db.Query<xItemDrop>("Select * from xItemDrop");
                }
            }
            public class xItemDrop
            {
                public int  id { get; set; }
                public string dateReceived { get; set; }
                public string floor { get; set; }
                public string raider { get; set; }
                public string droptype { get; set; }
            }
        }
        public class Databasehandler
        {
            string DbPath = Path.Combine(AppContext.BaseDirectory, "ACAC2.db");

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
                            case "RaidItem":
                                Db.CreateTable<RaidItem>();
                                return true;
                            case "Archivedraiditem":
                                Db.CreateTable<Archivedraiditem>();
                                return true;
                            case "RoundrobinEntry":
                                Db.CreateTable<RoundrobinEntry>();
                                return true;
                            case "profile":
                                Db.CreateTable<profile>();
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/29afb530949056fe7581230e46ce25f8_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569951510", raiderbanner = "assets/img/img.png", raidername = "Aerilyn Elessedil", pageroute= "/raiders/aerilyn-elessedil" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/971ab9839fea01f73e66af3faca1fe39_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569949177", raiderbanner = "assets/img/img.png", raidername = "Hades Carmine", pageroute= "/raiders/hades-carmine" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/d4a9e875d82fae5d760ea19e106cde42_b937560c841465f7c4bc8eb47ea7948afc0_96x96.jpg?1569950175", raiderbanner = "assets/img/img.png", raidername = "La Ki", pageroute = "/raiders/la-ki" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/79bbfa3e3ffac4723c307a1ba522185f_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569951058", raiderbanner = "assets/img/img.png", raidername = "Lan Mantear", pageroute = "/raiders/lan-mantear" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/8343ee17af8fd3c4e5fb2bf918830e68_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569951307", raiderbanner = "assets/img/img.png", raidername = "Shelly Duncan", pageroute = "/raiders/shelly-duncan" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/9f92216069dfc0b084b11bbb9fb24dcb_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569950650", raiderbanner = "assets/img/img.png", raidername = "Thomas Silverstar", pageroute = "/raiders/thomas-silverstar" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/3f7234df431e4f6b75a65ec116494239_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569950644", raiderbanner = "assets/img/img.png", raidername = "Val Phoenix", pageroute = "/raiders/val-phoenix" });
                                Db.Insert(new profile { raiderimg = "https://img2.finalfantasyxiv.com/f/84263e7ebe2d0bcc2d03ee6fe83bbd69_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1569951336", raiderbanner = "assets/img/img.png", raidername = "Yumi Rin", pageroute = "/raiders/yumi-rin" });
                                return true;
                            case "ACACUser":
                                Db.CreateTable<ACACUser>();
                                Db.Insert(new ACACUser { username = "sanoken",
                                                         password ="babeth2019",
                                                         role ="admin" });
                                return true;
                            default:
                                return false;
                        }
                    }
                }
            }
            public IEnumerable<profile> GetProfiles()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<profile>("Select * from profile");
                }
            }
            public IEnumerable<profile> GetRaiderProfile(string XRaider)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    return Db.Query<profile>("Select * From profile where raidername='" + XRaider + "'");
                }
            }
            public IEnumerable<RaidItem> GetRaidItemsByRaider(string XRaider)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    RaidItem a = new RaidItem();
                    return Db.Query<RaidItem>("Select * From RaidItem where raidername='" + XRaider + "' order by Receiveddate desc, raidfloorname desc");
                }
            }
            public IEnumerable<RaidItem> GetRaidItemsByFloor(string XFloor)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    RaidItem a = new RaidItem();
                    return Db.Query<RaidItem>("Select * From RaidItem where Raidfloorname='" + XFloor + "' order by raidername desc");
                }
            }
            public void InsertUpdateProfile(profile _p)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    try
                    {
                        Db.InsertOrReplace(_p);
                    }
                    catch
                    {
                        Db.CreateTable<profile>();
                        Db.InsertOrReplace(_p);
                    }
                }
            }
            public IEnumerable<RaidItem> GetAllRaidItems()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<RaidItem>("Select * From RaidItem order by Receiveddate desc, raidfloorname desc");
                }
            }
            public IEnumerable<Settings> GetAllSettings()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Settings>("Select * From Settings");
                }
            }
            public IEnumerable<Settings> GetSetting(string nameSetting)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    return Db.Query<Settings>("Select * From Settings where nameSetting='" + nameSetting + "'");
                }
            }
            public IEnumerable<RaidItem> GetRecentRaidItems()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<RaidItem>("Select * From RaidItem order by Receiveddate desc LIMIT 15");
                }
            }
            public IEnumerable<Archivedraiditem> GetArchivedItems()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<Archivedraiditem>("Select * From Archivedraiditem");
                }
            }
            public void DeleteItemByID(string id)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    IEnumerable<RaidItem> xids = Db.Query<RaidItem>("Select * From RaidItem where id=" + id);
                    foreach (RaidItem xid in xids)
                    {
                        Archivedraiditem Xida = new Archivedraiditem
                        {
                            Archiveddate = DateTime.Now.ToString(),
                            Receiveddate = xid.Receiveddate,
                            raidItem = xid.raidItem,
                            Raidfloorname = xid.Raidfloorname,
                            id = xid.id,
                            raidername = xid.raidername
                        };
                        Db.Insert(Xida);
                        Db.Execute("Delete from RaidItem where id=" + id);
                    }
                }
            }
            public void AddItemDrop(RaidItem xItem)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(xItem);
                }
            }
            public void AddRoundRobin(RoundrobinEntry XItem)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    Db.Insert(XItem);
                }
            }
            public IEnumerable<RoundrobinEntry> GetRoundRobin(string XRaiditem, string XRaidfloorname)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    if (TableExists("RoundrobinEntry"))
                    {
                        return Db.Query<RoundrobinEntry>("Select * From RoundrobinEntry where Raidfloorname='" + XRaidfloorname + "' and Raiditem='" + XRaiditem + "'");
                    }
                    else { return Enumerable.Empty<RoundrobinEntry>(); }
                    
                }
            }
            public IEnumerable<RoundrobinEntry> GetRoundRobin(string XRaidfloorname)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    if (TableExists("RoundrobinEntry"))
                    {
                        return Db.Query<RoundrobinEntry>("Select * From RoundrobinEntry where Raidfloorname='" + XRaidfloorname + "'");
                    }
                    else { return Enumerable.Empty<RoundrobinEntry>(); }

                }
            }
            public void ResetRoundRobin(string XRaiditem, string XRaidfloorname)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    Db.Execute("Delete From RoundrobinEntry where Raiditem='" + 
                                XRaiditem + "' and Raidfloorname='" + XRaidfloorname + "'");
                }
            }
            public bool validate(string g)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {

                    if (TableExists("ACACUser"))
                    {
                        if (Db.ExecuteScalar<int>("SELECT count(*) from ACACUser where _guid='" + g + "'") > 0)
                        {
                            return true;
                        }
                        else { return false; }
                    }
                    else { return false; }
                }
            }
            public bool Validateuser(string username, string password, string g)
            {
                ACACUser u = new ACACUser
                {
                    username = username,
                    password = password,
                    _guid = g
                };

                using (var Db = new SQLiteConnection(DbPath))
                {

                    if (TableExists("ACACUser"))
                    {
                        if (Db.ExecuteScalar<int>("SELECT count(*) from ACACUser where username='" + u.username + "' and password='" + u.password + "'") > 0)
                        {
                            try
                            {
                                Db.InsertOrReplace(u);
                            }
                            catch
                            {
                                Db.CreateTable<ACACUser>();
                                Db.InsertOrReplace(u);
                            }
                            return true;
                        }
                        else { return false; }
                    }
                    else { return false; }
                }
            }
        }
        #endregion

        #region " Round-robin Lists "

        public class RoundrobinEntry
        {
            public string Raiditem { get; set; }
            public string Raidfloorname { get; set; }
            public string raidername { get; set; }
        }

        public class Displayroundrobinentry: RoundrobinEntry
        {
            public profile raider { get; set; }
        }

        #endregion

        #region "Raid Item"

        public class RaidItem
        {
            [PrimaryKey,AutoIncrement]
            public int id { get; set; }
            public DateTime Receiveddate { get; set; }
            public string Raidfloorname { get; set; }
            public string raidItem { get; set; }
            public string raidItemimage { get; set; }
            public string raidername { get; set; }
        }
        public class Customraiditem : RaidItem
        {
            public profile Profile { get; set; }
            public string RaidfloorImage { get; set; }
        }
        public class Archivedraiditem : RaidItem
        {
            public string Archiveddate { get; set; }
        }

       #endregion
        public class genericResponse
        {
            public string gString { get; set; }
        }
        public class profile
        {
            [PrimaryKey]
            public string raidername { get; set; }
            public string raiderimg { get; set; }
            public string raiderbanner { get; set; }
            public string pageroute { get; set; }
        }
        public class Roundrobinreset
        {
            public string raidfloorname { get; set; }
            public string raiditem { get; set; }
            public string[] raiders { get; set; }
        }
        public class Settings
        {
            public string nameSetting { get; set; }
            public string valueSetting { get; set; }
        }
        public class ACACUser
        {
            [PrimaryKey]
            public string username { get; set; }
            public string password { get; set; }
            public string role { get; set; }
            public bool loggedIn { get; set; }
            public DateTime expirationDate { get; set; }
            public string _guid { get; set; }
        }
    }
}
