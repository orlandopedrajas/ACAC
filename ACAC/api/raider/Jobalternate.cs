using SQLite;

namespace ACAC.api.raider
{
    public class Jobalternate
    {
        [PrimaryKey]
        public string raidername { get; set; }
        public string alt1 { get; set; }
        public string alt2 { get; set; }
        public string hasalt1 { get; set; }
        public string hasalt2 { get; set; }
    }
}
