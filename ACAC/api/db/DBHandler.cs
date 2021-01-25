using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using SQLite;

namespace ACAC.api.db
{
    public class DBHandler
    {
        string DbPath = Path.Combine(AppContext.BaseDirectory, "ACAC3.db");

        public void InsertUpdateJobAlternate(raider.Jobalternate ja)
        {
            using (var Db = new SQLite.SQLiteConnection(DbPath))
            {
                try
                {
                    Db.InsertOrReplace(ja);
                }
                catch
                {
                    Db.CreateTable<raider.Jobalternate>();
                    Db.InsertOrReplace(ja);
                }
            }
        }

        public void InsertUpdateImage(report.album album)
        {
            using (var Db = new SQLite.SQLiteConnection(DbPath))
            {
                try
                {
                    Db.InsertOrReplace(album);
                }
                catch
                {
                    Db.CreateTable<report.album>();
                    Db.InsertOrReplace(album);
                }
            }
        }
        public IEnumerable<report.album> Getalbumbyname(string album)
        {
            using (var Db = new SQLite.SQLiteConnection(DbPath))
            {
                TableExists("album");
                return Db.Query<report.album>("Select * from album where albumname='" + album + "'");
            }
        }

        public IEnumerable<raider.Jobalternate> GetAllJOBAlternates()
        {
            using (var Db = new SQLite.SQLiteConnection(DbPath))
            {
                //return Enumerable.Empty<JOBAlternate>();
                return Db.Query<raider.Jobalternate>("Select * from Jobalternate");
            }
        }
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
                        case "Attendance":
                            Db.CreateTable<raid.Attendance>();
                            return true;
                        case "Jobalternate":
                            Db.CreateTable<raider.Jobalternate>();
                            return true;
                        case "album":
                            Db.CreateTable<report.album>();
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
        public void DeleteJobAlternate(string raidername)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete from Jobalternate where raidername='" + raidername + "'");
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
        public void RunCommand(string Command)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute(Command);
            }
        }
        public IEnumerable<raid.RaidContent> GetRaidContentOnly(string contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                return Db.Query<raid.RaidContent>("Select * From RaidContent where id=" + contentid);
            }
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
                    return Db.Query<raid.RaidItemDrop>("Select * From RaidItemDrop where contentid not in(select id from raidcontent where isenabled = 0) and raidername='" + raidername + "'");
                }
                else
                {
                    return Db.Query<raid.RaidItemDrop>("Select * From RaidItemDrop where contentid not in(select id from raidcontent where isenabled = 0)");
                }
            }
        }
        public IEnumerable<raid.RaidItemDrop> GetRaidItemDropByContent(string contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (contentid != null)
                {
                    return Db.Query<raid.RaidItemDrop>("Select * From RaidItemDrop where contentid='" + contentid + "'");
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
        public void AddLog(logs log)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                try
                {
                    Db.Insert(log);
                }
                catch
                {
                    Db.CreateTable<logs>();
                    Db.Insert(log);
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
        public void DeleteRaidItemDrop(int id)
        {
            using (var Db = new SQLiteConnection(DbPath))
            { 
                Db.Execute("Delete from RaidItemDrop where id=" + id); 
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
        public void Deleteuserprofile(string raidername)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete from profile where raidername='" + raidername + "'");
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
        public IEnumerable<raid.Attendance> GetAllAttendance()
        {
            TableExists("Attendance");
            using (var Db = new SQLiteConnection(DbPath))
            {
                return Db.Query<raid.Attendance>("Select * From Attendance order by Eventdate");
            }
        }
        public void AddAttendance(raid.Attendance xItem)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                try
                {
                    if (Db.ExecuteScalar<int>("Select count(*) From Attendance where Raidername='" + xItem.Raidername + "' and Eventdate='" + xItem.Eventdate + "'") == 0)
                    {
                        Db.Insert(xItem);
                    }
                    else
                    {
                        int attended;
                        if (xItem.Attended) { attended = 1; } else { attended = 0; }
                        Db.Execute("Update Attendance set Attended='" + attended + "' where Raidername='" + xItem.Raidername + "' and Eventdate='" + xItem.Eventdate + "'");
                    }
                }
                catch
                {
                    Db.CreateTable<raid.Attendance>();
                    Db.Insert(xItem);
                }
            }
        }
        public IEnumerable<report.ReportData> GetItemDropReportByRaider(string raidername)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                return Db.Query<report.ReportData>("select c.contentname ReportName, count(c.contentname) ReportValue from RaidItemDrop d left outer join RaidContent c on d.contentid = c.id where d.raidername = '" + raidername + "' and c.isenabled=1 Group by c.contentname");
            }
        }
        public IEnumerable<report.ReportData> GetItemDropReportByFloor(string contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                if (contentid == "ALL") 
                {
                    return Db.Query<report.ReportData>("select d.raidername ReportName, count(d.raidername) ReportValue from RaidItemDrop d left outer join RaidContent c on d.contentid = c.id where c.isenabled=1 Group by d.raidername");
                }
                else
                {
                    return Db.Query<report.ReportData>("select d.raidername ReportName, count(d.raidername) ReportValue from RaidItemDrop d left outer join RaidContent c on d.contentid = c.id where c.id = " + contentid + " and c.isenabled=1 Group by d.raidername");
                }
            }
        }
        public void ResetDatabase()
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete from Attendance"); // Delete Attendance records
                Db.Execute("Delete from RaidItemDrop"); // Delete Raid Item Drops
                Db.Execute("Delete from Roundrobinentry"); // Delete Round Robin Entries

            }
        }
        public void Deleteraidropbycontentid(int contentid)
        {
            using (var Db = new SQLiteConnection(DbPath))
            {
                Db.Execute("Delete from RaidItemDrop where contentid=" + contentid);
            }
        }
    }
}
