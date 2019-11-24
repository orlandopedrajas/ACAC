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
        public Dictionary<raid.RaidContent, IEnumerable<raid.Raiditeminfo>> GetRaidContent(string contentname)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dictionary<raid.RaidContent, IEnumerable<raid.Raiditeminfo>> rsp = null;
            if (Dbh.TableExists("RaidContent"))
            {
                rsp = Dbh.GetRaidContent(contentname);
            }
            return rsp;
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

        #endregion

    }
}
