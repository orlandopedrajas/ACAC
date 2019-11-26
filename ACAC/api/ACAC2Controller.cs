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

        #region "Common Response"
        
        #endregion

        #region "GET"

        [HttpGet("[action]")]
        public IEnumerable<raid.RaidContentResponse> GetRaidContent(string contentname)
        {
            db.DBHandler Dbh = new db.DBHandler();
            
            if (Dbh.TableExists("RaidContent"))
            {
                return Dbh.GetRaidContent(contentname);
            }
            return Enumerable.Empty<raid.RaidContentResponse>();
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
        #endregion

    }
}
