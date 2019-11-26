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
                        default:
                            return false;
                    }
                }
            }
        }

        public IEnumerable<raid.Raiditeminfo> GetRaidItemInfo(int contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                TableExists("Raiditeminfo");
                return Db.Query<raid.Raiditeminfo>("Select * from Raiditeminfo where contentid=" + contentid);
            }
        }
        public IEnumerable<raid.RaidContentResponse> GetRaidContent(string contentname)
        {
            List<raid.RaidContentResponse> rsp = new List<raid.RaidContentResponse>();
            
            using (var Db = new SQLiteConnection(DbPath))
            {
                IEnumerable<raid.RaidContent> rslt;

                if (contentname != null)
                {
                    rslt = Db.Query<raid.RaidContent>("Select * From RaidContent where contentname='" + contentname + "'");
                }
                else
                {
                    rslt = Db.Query<raid.RaidContent>("Select * From RaidContent");
                }
                foreach (raid.RaidContent r in rslt)
                {
                    // rsp.Add(r, GetRaidItemInfo(r.contentname));
                    rsp.Add(new raid.RaidContentResponse { _raidContent = r,
                                                           _RaidItems = GetRaidItemInfo(r.id)
                                                         });
                }
            }
            return rsp;
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
    }
}
