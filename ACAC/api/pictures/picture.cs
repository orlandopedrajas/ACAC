using SQLite;

namespace ACAC.api.pictures
{
    public class picture
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public string url { get; set; }
        public string uploaddate { get; set; }
        public string category { get; set; }
        public bool favorite { get; set; }
    }
}
