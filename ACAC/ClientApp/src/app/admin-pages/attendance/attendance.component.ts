import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';

export class Attendance {
    id: number;
    Eventdate: string;
    Raidername: string;
    Attended: boolean;
}
export class IEvent {
  eventdate: string;
  raider: any[];
}
@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
  })

  export class AttendanceComponent {
    isDisabled: boolean;
    raiderprofiles: any[];
    raiderIdentity: RaiderIdentity = new RaiderIdentity();
    thisAttendance: any[] = [];
    displayedColumns: string[] = ['Eventdate', 'Raidername', 'Attended'];
    obj: any[] = [];

    CurrentDate: Date;
    constructor(private http: HttpClient) {
        if (!this.raiderIdentity.IsAdmin()) { window.location.href = '/'; }
        this.GetAttendance();
        this.getRaiderProfiles();
        this.isDisabled = false;
    }

    toggleAttended(event, raidername) {
        // .obj[num].Attended = event.checked;
        let num = 0;
        this.obj.forEach((value) => {
          if (value.Raidername === raidername) {
            this.obj[num].Attended = event.checked;
          }
          num += 1;
        });
        console.log(this.obj);
    }
    getRaiderProfiles() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
        this.obj = [];
        this.raiderprofiles = result.filter(r => r.israidmember === true).sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
        this.raiderprofiles.forEach((value) => {
            this.obj.push({Raidername: value.raidername, Attended: false});
        });
      });
    }
    GetAttendance() {
        this.thisAttendance = [];
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetAllAttendance').subscribe(result => {

         let currentdate;
         let ie = null;

         result.sort((a, b) => (new Date(a.eventdate) < new Date(b.eventdate)) ? 1 : -1)
         .forEach((value) => {

            if (currentdate !== value.eventdate) {
              if (ie !== null) {
                ie.raider = ie.raider.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
                this.thisAttendance.push(ie);
              }
              ie = new IEvent();
              currentdate = value.eventdate;
              ie.eventdate = currentdate;
              ie.raider = [];
            }

            ie.raider.push({raidername: value.raidername, attended: value.attended});

         });

         ie.raider = ie.raider.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
         this.thisAttendance.push(ie);

       }, error => console.error(error));
    }
    SaveAttendance(event) {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        const alist = [];
        this.obj.forEach((value) => {
            const ae = new Attendance();
            ae.id = 0;
            ae.Raidername = value.Raidername;
            ae.Eventdate = this.CurrentDate.toString();
            ae.Attended = value.Attended;
            alist.push(ae);
        });
        console.log(alist);
        this.http.post('./api/ACAC2/AddAttendance', JSON.stringify(alist), {headers: header}).subscribe((val) => {  }, response => { },
        () => {
           this.isDisabled = true;

           window.location.reload();
        }
      );

    }
  }
