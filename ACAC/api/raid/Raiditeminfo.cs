using SQLite;
namespace ACAC.api.raid
{
    public class Raiditeminfo
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string contentname { get; set; }
        public string raiditemname { get; set; }
        public string raiditemimg { get; set; }
        public bool hasroundrobin { get; set; }
    }
}
