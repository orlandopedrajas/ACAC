using SQLite;

namespace ACAC.api.raider
{
    public class profile
    {
        [PrimaryKey]
        public string raidername { get; set; }
        public string discorduser { get; set; }
        public string raiderimg { get; set; }
        public bool isadmin { get; set; }
        public string lodestoneid { get; set; }
        public bool israidmember { get; set; }
        public bool isninemember { get; set; }
    }
}
