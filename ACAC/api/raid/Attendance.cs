using SQLite;

namespace ACAC.api.raid
{
    public class Attendance
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string Eventdate { get; set; }
        public string Raidername { get; set; }
        public bool Attended { get; set; }
    }
}
