using SQLite;
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
        public string raidername { get; set; }
    }
    public class Displayroundrobinentry: Roundrobinentry
    {
        public raider.profile raider { get; set; }
    }
}
