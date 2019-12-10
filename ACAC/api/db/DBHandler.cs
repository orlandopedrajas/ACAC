using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SQLite;

namespace ACAC.api.db
{
    public class DBHandler
    {
        string DbPath = Path.Combine(AppContext.BaseDirectory, "ACAC3.db");

        public IEnumerable<raid.Roundrobinentry> GetRoundRobin(int contentid, string XRaidItem)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                TableExists("Roundrobinentry");
                return Db.Query<raid.Roundrobinentry>("Select * From Roundrobinentry where contentid=" + contentid + " and raiditem='" + XRaidItem + "'");                
            }
        }
        public IEnumerable<raid.Roundrobinentry> GetRoundRobin(int contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                TableExists("Roundrobinentry");
                return Db.Query<raid.Roundrobinentry>("Select * From Roundrobinentry where contentid=" + contentid);
            }
        }
        public void DropTable(string tablename)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Drop table " + tablename);
            }
        }
        public bool TableExists(string tablename)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (Db.ExecuteScalar<int>("Select count(*) From sqlite_master Where type='table' and name='" + tablename + "'") > 0)
                { 
                    return true;
                }
                else 
                {
                    switch (tablename)
                    {
                        case "Raiditeminfo":
                            Db.CreateTable<raid.Raiditeminfo>();
                            return true;
                        case "RaidContent":
                            Db.CreateTable<raid.RaidContent>();
                            return true;
                        case "profile":
                            Db.CreateTable<raider.profile>();
                            return true;
                        case "Roundrobinentry":
                            Db.CreateTable<raid.Roundrobinentry>();
                            return true;
                        default:
                            return false;
                    }
                }
            }
        }
        public IEnumerable<raid.Raiditeminfo> GetRaidItemInfo(string contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                TableExists("Raiditeminfo");
                return Db.Query<raid.Raiditeminfo>("Select * from Raiditeminfo where contentid=" + contentid);
            }
        }
        public IEnumerable<raid.RaidContentResponse> GetRaidContent(string contentid)
        {
            List<raid.RaidContentResponse> rsp = new List<raid.RaidContentResponse>();
            
            using (var Db = new SQLiteConnection(DbPath))
            {
                IEnumerable<raid.RaidContent> rslt;

                if (contentid != null)
                {
                    rslt = Db.Query<raid.RaidContent>("Select * From RaidContent where id=" + contentid);
                }
                else
                {
                    rslt = Db.Query<raid.RaidContent>("Select * From RaidContent");
                }
                foreach (raid.RaidContent r in rslt)
                {
                    // rsp.Add(r, GetRaidItemInfo(r.contentname));
                    rsp.Add(new raid.RaidContentResponse { _raidContent = r,
                                                           _RaidItems = GetRaidItemInfo(r.id.ToString())
                                                         });
                }
            }
            return rsp;
        }
        public IEnumerable<raider.profile> GetUserprofiles(string raidername)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (raidername != null)
                {
                    return Db.Query<raider.profile>("Select * From profile where raidername='" + raidername + "'");
                }
                else
                {
                    return Db.Query<raider.profile>("Select * From profile");
                }
            }
        }
        public IEnumerable<raid.RaidItemDrop> GetRaidItemDrop(string raidername)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (raidername != null)
                {
                    return Db.Query<raid.RaidItemDrop>("Select * From RaidItemDrop where raidername='" + raidername + "'");
                }
                else
                {
                    return Db.Query<raid.RaidItemDrop>("Select * From RaidItemDrop");
                }
            }
        }
        public IEnumerable<raider.profile> GetUserprofileByDiscordUser(string discorduser)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (discorduser != null)
                {
                    return Db.Query<raider.profile>("Select * From profile where discorduser='" + discorduser + "'");
                }
                else
                {
                    return Db.Query<raider.profile>("Select * From profile");
                }
            }
        }
        public void AddRaidContent(raid.RaidContent raidContent)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                try
                {
                    Db.Insert(raidContent);                
                }
                catch 
                {
                    Db.CreateTable<raid.RaidContent>();
                    Db.Insert(raidContent);
                }
            }
        }
        public void AddRaidItemDrop(raid.RaidItemDrop raiditemdrop)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                try
                {
                    Db.Insert(raiditemdrop);
                }
                catch
                {
                    Db.CreateTable<raid.RaidItemDrop>();
                    Db.Insert(raiditemdrop);
                }
            }
        }
        public void Upsertuserprofile(raider.profile profile)
        {
            using (var Db = new SQLiteConnection(DbPath))
            { 
                try
                { 
                    Db.InsertOrReplace(profile);
                }
                catch
                {
                    Db.CreateTable<raider.profile>();
                    Db.Insert(profile);
                }
            }
        }
        public void UpdateRaidContent(raid.RaidContent raidContent)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.InsertOrReplace(raidContent);
            }
        }
        public void AddRaiditeminfo(raid.Raiditeminfo rii)
        {
            using (var Db = new SQLiteConnection(DbPath))
            { 
                try
                {
                    Db.Insert(rii);
                }
                catch
                {
                    Db.CreateTable<raid.Raiditeminfo>();
                    Db.Insert(rii);
                }
            }
        }
        public void UpdateRaiditeminfo(raid.Raiditeminfo rii)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.InsertOrReplace(rii);
            }
        }
        public void DeleteRaidItemInfo(string id)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete from Raiditeminfo where id=" + id);
            }
        }
        public void AddRoundRobinEntry(raid.Roundrobinentry entry)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                try
                {
                    Db.Insert(entry);
                }
                catch
                {
                    Db.CreateTable<raid.Roundrobinentry>();
                    Db.Insert(entry);
                }
            }
        }
        public void ResetRoundRobin(string XRaiditem, int contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete From RoundrobinEntry where Raiditem='" +
                            XRaiditem + "' and contentid=" + contentid);
            }
        }
        
    }
}
