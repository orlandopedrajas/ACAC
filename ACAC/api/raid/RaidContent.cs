using SQLite;

namespace ACAC.api.raid
{
    public class RaidContent
    {
        [PrimaryKey]
        public string contentname { get; set; }
        public string contentdescription { get; set; }
        public string contentimg { get; set; }
    }
}
