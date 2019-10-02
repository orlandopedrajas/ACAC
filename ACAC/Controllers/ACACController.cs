﻿using System;
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
                    return Dbh.GetPofiles();
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

        #region "Get Raid Items"

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
                        profile p = Dbh.GetRaiderProfile(ri.raidername);
                        li.Add(new Customraiditem
                        {
                            id = ri.id,
                            Profile = p,
                            raidername = ri.raidername,
                            RaidfloorImage = GetFloorImage(ri.Raidfloorname),
                            Raidfloorname = ri.Raidfloorname,
                            raidItem = ri.raidItem,
                            Receiveddate = ri.Receiveddate
                        });
                    }
                }
                else
                {
                    foreach (RaidItem ri in Dbh.GetRaidItemsByRaider(XRaider))
                    {
                        profile p = Dbh.GetRaiderProfile(ri.raidername);
                        li.Add(new Customraiditem
                        {
                            id = ri.id,
                            Profile = p,
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

        [HttpPost("[action]")]
        public IActionResult addDrop([FromBody] RaidItem x)
        {
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            Databasehandler Dbh = new Databasehandler();
            Dbh.AddItemDrop(x);
            return Ok();
        }

        #endregion

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

        #endregion

        #region "dB Handler"
        public class Databasehandler
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
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Aerilyn Elessedil" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Hades Carmine" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "La Ki" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Lan Mantear" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Shelly Duncan" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Thomas Silverstar" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Val Phoenix" });
                                Db.Insert(new profile { raiderimg = "assets/img/no-profile.png", raiderbanner = "assets/img/img.png", raidername = "Yumi Rin" });
                                return true;
                            default:
                                return false;
                        }
                    }
                }
            }
            public IEnumerable<profile> GetPofiles()
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    return Db.Query<profile>("Select * from profile");
                }
            }
            public profile GetRaiderProfile(string XRaider)
            {
                using (var Db = new SQLiteConnection(DbPath))
                {
                    return Db.ExecuteScalar<profile>("Select * From profile where raidername='" + XRaider + "'");
                }
            }
            public IEnumerable<RaidItem> GetRaidItemsByRaider(string XRaider)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    RaidItem a = new RaidItem();
                    return Db.Query<RaidItem>("Select * From RaidItem where raidername='" + XRaider + "'");
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
                    return Db.Query<RaidItem>("Select * From RaidItem");
                }
            }

            public void AddItemDrop(RaidItem xItem)
            {
                using (var Db = new SQLite.SQLiteConnection(DbPath))
                {
                    Db.Insert(xItem);
                }
            }

        }
        #endregion
        #region " Round-robin Lists "

        public class RoundrobinEntry
        {
            public string Listtype { get; set; }
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
        public class profile
        {
            [PrimaryKey]
            public string raidername { get; set; }
            public string raiderimg { get; set; }
            public string raiderbanner { get; set; }
        }
        #endregion
    }
}
