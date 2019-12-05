using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SQLite;

namespace ACAC.api
{
    [Route("api/[controller]")]
    public class ACAC2Controller : Controller
    {

        #region "GET"

        [HttpGet("[action]")]
        public IEnumerable<raid.RaidContentResponse> GetRaidContent(string contentid)
        {
            db.DBHandler Dbh = new db.DBHandler();

            if (Dbh.TableExists("RaidContent"))
            {
                return Dbh.GetRaidContent(contentid);
            }
            return Enumerable.Empty<raid.RaidContentResponse>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raider.profile> GetRaiderProfiles(string raidername)
        {
            db.DBHandler Dbh = new db.DBHandler();

            if (Dbh.TableExists("profile"))
            {
                return Dbh.GetUserprofiles(raidername);
            }
            return Enumerable.Empty<raider.profile>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raider.profile> GetRaiderProfilesByDiscordUser(string discorduser)
        {
            db.DBHandler Dbh = new db.DBHandler();

            if (Dbh.TableExists("profile"))
            {
                return Dbh.GetUserprofileByDiscordUser(discorduser);
            }
            return Enumerable.Empty<raider.profile>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.RaidItemDrop> GetRaidItemDrop(string raidername)
        {
            db.DBHandler Dbh = new db.DBHandler();
            if (Dbh.TableExists("RaidItemDrop"))
            {
                return Dbh.GetRaidItemDrop(raidername);
            }
            return Enumerable.Empty<raid.RaidItemDrop>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.Displayroundrobinentry> GetRoundRobinList(int contentid)
        {
            db.DBHandler Dbh = new db.DBHandler();
            if (Dbh.TableExists("Roundrobinentry"))
            {
                List<raid.Displayroundrobinentry> li = new List<raid.Displayroundrobinentry>();
                 IEnumerable<raid.Roundrobinentry> rres = Dbh.GetRoundrobinentries(contentid);
                 foreach (raider.profile p in Dbh.GetUserprofiles(null))
                 {
                     li.Add(new raid.Displayroundrobinentry {
                                
                     });
                 }
            }
            return Enumerable.Empty<raid.Displayroundrobinentry>();
        }
        #endregion

        #region "POST"

        [HttpPost("[action]")]
        public IActionResult AddRaidContent([FromBody] raid.RaidContent raidContent)
        {
            if (raidContent == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.AddRaidContent(raidContent);
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult UpdateRaidContent([FromBody] raid.RaidContent raidContent)
        {
            if (raidContent == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.UpdateRaidContent(raidContent);
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult AddRaiditeminfo([FromBody] raid.Raiditeminfo raidItemInfo)
        {
            if (raidItemInfo == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.AddRaiditeminfo(raidItemInfo);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult DeleteRaiditeminfo([FromBody] string id)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.DeleteRaidItemInfo(id);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult UpdateRaiditeminfo([FromBody] raid.Raiditeminfo raidItemInfo)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.UpdateRaiditeminfo(raidItemInfo);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult Upsertuserprofile([FromBody] raider.profile profile)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.Upsertuserprofile(profile);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult AddRaidItemDrop([FromBody] raid.RaidItemDrop raiditemdrop)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.AddRaidItemDrop(raiditemdrop);
            return Ok();
        }
        #endregion

    }
}
