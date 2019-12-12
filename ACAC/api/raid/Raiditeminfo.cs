using SQLite;
using System;

namespace ACAC.api.raid
{
    public class Raiditeminfo
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public int contentid { get; set; }
        public string raiditemname { get; set; }
        public string raiditemimg { get; set; }
        public bool hasroundrobin { get; set; }
    }
    public class Roundrobinentry
    {
        public string raiditem { get; set; }
        public int raiditeminfoid { get; set; }
        public int contentid { get; set; }
        public string raidername { get; set; }
    }
    public class Displayroundrobinentry: Roundrobinentry
    {
        public raider.profile raider { get; set; }
    }
    public class Roundrobinreset
    {
        public int contentid { get; set; }
        public string raiditem { get; set; }
        public int raideriteminfo { get; set; }
        public string [] raiders { get; set; }
    }
    public class RaidItemDrop
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public DateTime receiveddate { get; set; }
        public string raidername { get; set; }
        public int contentid { get; set; }
        public int raiditeminfoid { get; set; }
        public string raiditem { get; set; }
    }
    public class CustomRaidItem : RaidItemDrop
    {
        public raider.profile profile;
        public raid.Raiditeminfo raiditeminfo;
        public raid.RaidContent raidcontent;
    }
}
