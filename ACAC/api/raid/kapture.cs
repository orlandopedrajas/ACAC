using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACAC.api.raid
{



    public class kapture
    {
        public class ACTLogLineEvents
        {
            public string DetectedTime { get; set; }
            public string DetectedZone { get; set; }
            public string LogLine { get; set; }
        }
        
        public class XIVEvents
        {
            public string XIVEventSubType { get; set; }
            public Items Item { get; set; }
            public Actors Actor { get; set; }
            public Locations Location { get; set; }
        }
        public class Items
        {
            public string Id { get; set; }
            public string ProperName { get; set; }
            public string SingularName { get; set; }
            public string PluralName { get; set; }
            public string Quantity { get; set; }
        }
        public class Actors
        {
            public class ClassJobs
            {
                public string Abbrebiation { get; set; }
                public string Id { get; set; }
                public string Name { get; set; }
            }
            public class Worlds
            {
                public string Id { get; set; }
                public string Name { get; set; }
            }
            public string Id { get; set; }
            public ClassJobs ClassJob { get; set; }
            public string Level { get; set; }
            public string Name { get; set; }
            public Worlds CurrentWorld { get; set; }
            public Worlds HomeWorld { get; set; }
            public string IsReporter { get; set; }
        }
        public class Locations
        {
            public class Regions
            {
                public string Id { get; set; }
                public string Name { get; set; }
            }
            public string TerritoryTypeId { get; set; }
            public Regions Region { get; set; }
            public Regions Zone { get; set; }
            public Regions Territory { get; set; }
        }
        string Id { get; set; }
        public ACTLogLineEvents ACTLogLineEvent { get; set;}
        public XIVEvents XIVEvent { get; set; }
        public string Timestamp { get; set; }
        public string LogCode { get; set; }
        public string GameLogCode { get; set; }
        public string LogMessage { get; set; }
    }
}
