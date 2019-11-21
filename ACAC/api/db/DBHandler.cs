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

        public IEnumerable<raid.Raiditeminfo> GetRaidItemInfo(string contentname)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                TableExists("Raiditeminfo");
                return Db.Query<raid.Raiditeminfo>("Select * from Raiditeminfo where contentname='" + contentname + "'");
            }
        }
        public Dictionary<raid.RaidContent, IEnumerable<raid.Raiditeminfo>> GetRaidContent(string contentname)
        {
            Dictionary<raid.RaidContent, IEnumerable<raid.Raiditeminfo>> rsp = new Dictionary<raid.RaidContent, IEnumerable<raid.Raiditeminfo>>();
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
                    rsp.Add(r, GetRaidItemInfo(r.contentname));
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
                    Db.InsertOrReplace(raidContent);
                }
                catch 
                {
                    Db.CreateTable<raid.RaidContent>();
                    Db.Insert(raidContent);
                }
            }
        }
    }
}
