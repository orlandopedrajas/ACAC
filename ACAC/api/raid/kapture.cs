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

            public string RaidDropItem()
            {
                if (ProperName.ToLower() == "Edenchoir Waist Gear Coffer".ToLower() ||
                    ProperName.ToLower() == "Edenchoir Earring Coffer".ToLower() ||
                    ProperName.ToLower() == "Edenchoir Necklace Coffer".ToLower() ||
                    ProperName.ToLower() == "Edenchoir Bracelet Coffer".ToLower() ||
                        ProperName.ToLower() == "Edenchoir Ring Coffer".ToLower())
                {
                    return "Accessory Coffer";
                }
                else if (ProperName.ToLower() == "Edenchoir Head Gear Coffer".ToLower() ||
                         ProperName.ToLower() == "Edenchoir Hand Gear Coffer".ToLower() ||
                         ProperName.ToLower() == "Edenchoir Foot Gear Coffer".ToLower() ||
                         ProperName.ToLower() == "Edenchoir Leg Gear Coffer".ToLower())
                {
                    return "Equipment Coffer";
                }
                else if (ProperName.ToLower() == "Edenchoir Chest Gear Coffer".ToLower())
                {
                    return "Chest Coffer";
                }
                else if (ProperName.ToLower() == "Edenchoir Weapon Coffer".ToLower())
                {
                    return "Weapon Coffer";
                }
                else
                { return ProperName; }
            }
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
            public string RaiderName()
            {
                db.DBHandler Dbh = new db.DBHandler();
                foreach (raider.profile p in Dbh.GetUserprofiles(Name))
                {
                    return p.raidername;
                }
                return "PUG";
            }
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
