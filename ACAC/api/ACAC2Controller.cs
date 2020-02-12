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
        public IEnumerable<raider.Jobalternate> GetAllJOBAlternates()
        {
            try
            {
                db.DBHandler Dbh = new db.DBHandler();
                if (Dbh.TableExists("Jobalternate"))
                {
                   return Dbh.GetAllJOBAlternates();
                }
                else { return Enumerable.Empty<raider.Jobalternate>(); }
            }
            catch { return Enumerable.Empty<raider.Jobalternate>(); }
        }

        [HttpGet("[action]")]
        public IEnumerable<report.ReportData> GetItemDropReportByFloor(string contentid)
        {
            try
            {
                db.DBHandler Dbh = new db.DBHandler();
                return Dbh.GetItemDropReportByFloor(contentid);
            }
            catch { return Enumerable.Empty<report.ReportData>(); }
        }
        [HttpGet("[action]")]
        public IEnumerable<report.ReportData> GetItemDropReportByRaider(string raidername)
        {
            try
            {
                db.DBHandler Dbh = new db.DBHandler();
                return Dbh.GetItemDropReportByRaider(raidername);
            }
            catch { return Enumerable.Empty<report.ReportData>(); }
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.Attendance> GetAllAttendance()
        {
            try
            {
                db.DBHandler Dbh = new db.DBHandler();
                if (Dbh.TableExists("Attendance"))
                {
                    return Dbh.GetAllAttendance();
                }
                else { return Enumerable.Empty<raid.Attendance>(); }
            }
            catch { return Enumerable.Empty<raid.Attendance>(); }
        }
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
        public IEnumerable<raid.CustomRaidItem> GetRaidItemDrop(string raidername)
        {
            db.DBHandler Dbh = new db.DBHandler();
            List<raid.CustomRaidItem> li = new List<raid.CustomRaidItem>();
            if (Dbh.TableExists("RaidItemDrop"))
            {
                foreach (raid.RaidItemDrop r in Dbh.GetRaidItemDrop(raidername))
                {
                    li.Add(new raid.CustomRaidItem
                    {
                        contentid = r.contentid,
                        id = r.id,
                        profile = Dbh.GetUserprofiles(r.raidername).FirstOrDefault(),
                        raidername = r.raidername,
                        raiditem = r.raiditem,
                        raiditeminfo = Dbh.GetRaidItemInfo(r.contentid.ToString()).Where(r1 => r1.id == r.raiditeminfoid).FirstOrDefault(),
                        raiditeminfoid = r.raiditeminfoid,
                        receiveddate = r.receiveddate,
                        raidcontent = Dbh.GetRaidContentOnly(r.contentid.ToString()).FirstOrDefault()
                    }) ;
                }
                return li;
            }
            return Enumerable.Empty<raid.CustomRaidItem>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.CustomRaidItem> GetRaidItemDropByContentId(string contentid)
        {
            db.DBHandler Dbh = new db.DBHandler();
            List<raid.CustomRaidItem> li = new List<raid.CustomRaidItem>();
            if (Dbh.TableExists("RaidItemDrop"))
            {
                foreach (raid.RaidItemDrop r in Dbh.GetRaidItemDropByContent(contentid))
                {
                    li.Add(new raid.CustomRaidItem
                    {
                        contentid = r.contentid,
                        id = r.id,
                        profile = Dbh.GetUserprofiles(r.raidername).FirstOrDefault(),
                        raidername = r.raidername,
                        raiditem = r.raiditem,
                        raiditeminfo = Dbh.GetRaidItemInfo(r.contentid.ToString()).Where(r1 => r1.id == r.raiditeminfoid).FirstOrDefault(),
                        raiditeminfoid = r.raiditeminfoid,
                        receiveddate = r.receiveddate,
                        raidcontent = Dbh.GetRaidContentOnly(r.contentid.ToString()).FirstOrDefault()
                    });
                }
                return li;
            }
            return Enumerable.Empty<raid.CustomRaidItem>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.Displayroundrobinentry> GetSpecificRoundRobinEntry(string contentid, string Xraiditem)
        {
            db.DBHandler Dbh = new db.DBHandler();
            if (Dbh.TableExists("Roundrobinentry"))
            {
                List<raid.Displayroundrobinentry> li = new List<raid.Displayroundrobinentry>();
                IEnumerable<raid.Raiditeminfo> ri = Dbh.GetRaidItemInfo(contentid);
                IEnumerable<raid.Roundrobinentry> rres = Dbh.GetRoundRobin(int.Parse(contentid), Xraiditem);

                // Get all raiders
                foreach (raider.profile p in Dbh.GetUserprofiles(null).Where(r => r.israidmember == true))
                {

                    if (rres.Where(r => r.raidername == p.raidername).Count() == 0)
                    {
                        li.Add(new raid.Displayroundrobinentry
                        {
                            raider = p,
                            raiditeminfoid = ri.Where(r => r.raiditemname == Xraiditem).FirstOrDefault().id,
                            raiditem = ri.Where(r => r.raiditemname == Xraiditem).FirstOrDefault().raiditemname,
                            contentid = int.Parse(contentid),
                            raidername = p.raidername
                        });;
                    }
                }

                return li;
            }
            return Enumerable.Empty<raid.Displayroundrobinentry>();
        }
        [HttpGet("[action]")]
        public IEnumerable<raid.Displayroundrobinentry> GetRoundRobinList(string contentid)
        {
            db.DBHandler Dbh = new db.DBHandler();
            if (Dbh.TableExists("Roundrobinentry"))
            {
                List<raid.Displayroundrobinentry> li = new List<raid.Displayroundrobinentry>();
                IEnumerable<raid.Raiditeminfo> ri = Dbh.GetRaidItemInfo(contentid);
                IEnumerable<raid.Roundrobinentry> rres = Dbh.GetRoundRobin(int.Parse(contentid));
                
                // Get all raiders
                foreach (raider.profile p in Dbh.GetUserprofiles(null).Where(r => r.israidmember == true))
                {
                    // Get Raiditems
                    foreach (raid.Raiditeminfo rii in ri)
                    { 

                        if (rii.hasroundrobin == true && rres.Where(r => r.raidername == p.raidername && r.raiditeminfoid == rii.id).Count() == 0)
                        {
                            li.Add(new raid.Displayroundrobinentry { raider = p,
                                                                    raiditeminfoid = rii.id,
                                                                    raiditem = rii.raiditemname,
                                                                    contentid = int.Parse(contentid),
                                                                    raidername = p.raidername });
                        }
                    }                     
                }

            return li;
            }
            return Enumerable.Empty<raid.Displayroundrobinentry>();
        }

        [HttpGet("[action]")]
        public IEnumerable<raid.RaidItemDrop> GetRaidItemDrops(string XRaider)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.TableExists("RaidItemDrop");
            if (XRaider == null)
            {
                return Dbh.GetRaidItemDrop(null);
            }
            else {
                return Dbh.GetRaidItemDrop(XRaider);
            }
        }
        #endregion

        #region "POST"

        [HttpPost("[action]")]
        public IActionResult AddJobAlt([FromBody] raider.Jobalternate x)
        {
            if (x == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.InsertUpdateJobAlternate(x);
            return Ok();
        }

        [HttpPost("[action]")]
        public IActionResult AddAttendance([FromBody] raid.Attendance[] _attendance)
        {
            if (_attendance == null) return BadRequest("Unfortunately your request could not be completed at this time, please try again later.");
            db.DBHandler Dbh = new db.DBHandler();
            foreach (raid.Attendance a in _attendance)
            {
                Dbh.AddAttendance(a);
            }
            return Ok();
        }
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
        public IActionResult DeleteJobalternate([FromBody] string raidername)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.DeleteJobAlternate(raidername);
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult DeleteItemDrop([FromBody] string id)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.DeleteRaidItemDrop(int.Parse(id));
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
        public IActionResult AddRaidItemDrop([FromBody] raid.RaidItemDrop x)
        {
            db.DBHandler Dbh = new db.DBHandler();
            Dbh.AddRaidItemDrop(x);

            if (Dbh.GetRaidItemInfo(x.contentid.ToString())
                .Where(r => r.id == x.raiditeminfoid && r.hasroundrobin == true).Count() > 0)
            { 
                if (Dbh.GetRoundRobin(x.contentid,x.raiditem).Count(r => r.raidername == x.raidername) == 0)
                {
                    raid.Roundrobinentry rre = new raid.Roundrobinentry
                    {
                        contentid = x.contentid,
                        raidername = x.raidername,
                        raiditem = x.raiditem,
                        raiditeminfoid = x.raiditeminfoid
                    };
                    Dbh.AddRoundRobinEntry(rre);
                    if (Dbh.GetRoundRobin(x.contentid, x.raiditem).Count() == GetRaiderProfiles(null).Where(r1 => r1.israidmember == true).Count())
                    {
                        Dbh.ResetRoundRobin(x.raiditem, x.contentid);
                    }
                }
            }
            
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult Roundrobinreset([FromBody] raid.Roundrobinreset X)
        {
            db.DBHandler Dbh = new db.DBHandler();
            List<string> LSRaiders = new List<string>(X.raiders);
            List<raider.profile> _p = Dbh.GetUserprofiles(null).Where(r => r.israidmember == true).ToList();

            Dbh.ResetRoundRobin(X.raiditem, X.contentid);
            foreach (string rrr in LSRaiders)
            {
                raider.profile p = _p.SingleOrDefault(r => r.raidername == rrr);
                _p.Remove(p);
            }

            foreach (raider.profile r in _p)
            {
                Dbh.AddRoundRobinEntry(new raid.Roundrobinentry 
                {   contentid = X.contentid,
                    raidername = r.raidername,
                    raiditem = X.raiditem,
                    raiditeminfoid = X.raideriteminfo
                });
            }
            return Ok();
        }
        #endregion

    }
}
