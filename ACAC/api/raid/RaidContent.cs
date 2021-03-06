﻿using System.Collections.Generic;
using SQLite;

namespace ACAC.api.raid
{
    public class RaidContentResponse
    {
        public RaidContent _raidContent { get; set; }
        public IEnumerable<Raiditeminfo> _RaidItems { get; set; }
    }

    public class RaidContent
    {
        [PrimaryKey, AutoIncrement]
        public int id { get; set; }
        public bool isenabled { get; set; }
        public string contentname { get; set; }
        public string contentdescription { get; set; }
        public string contentimg { get; set; }
    }
}
