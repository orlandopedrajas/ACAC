import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';
import { BuiltinType } from '@angular/compiler';

export class Attendance {
    id: number;
    Eventdate: string;
    Raidername: string;
    Attended: boolean;
}
export class IEvent {
  eventdate: string;
  aerilyn: boolean;
  hades: boolean;
  laki: boolean;
  lan: boolean;
  shelly: boolean;
  thomas: boolean;
  val: boolean;
  yumi: boolean;
}
@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
  })

  export class AttendanceComponent {
    isDisabled: boolean;
    raiderprofiles: any[];
    raiderIdentity: ThisRaider = new RaiderIdentity(this.cookieService).Raideridentity();
    thisAttendance: any[] = [];
    displayedColumns: string[] = ['Eventdate', 'Raidername', 'Attended'];
    obj: any[] = [{Raidername: 'Aerilyn Elessedil', Attended: false},
                    {Raidername: 'Hades Carmine', Attended: false},
                    {Raidername: 'La Ki', Attended: false},
                    {Raidername: 'Lan Mantear', Attended: false},
                    {Raidername: 'Shelly Duncan', Attended: false},
                    {Raidername: 'Thomas Silverstar', Attended: false},
                    {Raidername: 'Val Phoenix', Attended: false},
                    {Raidername: 'Yumi Rin', Attended: false}
                 ];
    CurrentDate: Date;
    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.GetAttendance();
        this.isDisabled = false;
    }

    toggleAttended(event, num) {
        this.obj[num].Attended = event.checked;
    }
    GetAttendance() {
        this.thisAttendance = [];
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetAllAttendance').subscribe(result => {

         let currentdate;
         let ie = new IEvent();
         // console.log(result);
         result.sort((a, b) => (new Date(a.eventdate) < new Date(b.eventdate)) ? 1 : -1)
         .forEach((value) => {
            // console.log(value);
            if (currentdate !== value.eventdate) {
              // console.log('Current Date: ' + currentdate + ' Event Date: ' + value.Eventdate);
              currentdate = value.eventdate;
              ie = new IEvent();
              ie.eventdate = currentdate;
            }
            // console.log(value);
            switch (value.raidername) {
              case 'Aerilyn Elessedil': {
                ie.aerilyn = value.attended;
                break;
              }
              case 'Hades Carmine': {
                ie.hades = value.attended;
                break;
              }
              case 'La Ki': {
                ie.laki = value.attended;
                break;
              }
              case 'Lan Mantear': {
                ie.lan = value.attended;
                break;
              }
              case 'Shelly Duncan': {
                ie.shelly = value.attended;
                break;
              }
              case 'Thomas Silverstar': {
                ie.thomas = value.attended;
                break;
              }
              case 'Val Phoenix': {
                ie.val = value.attended;
                break;
              }
              case 'Yumi Rin': {
                ie.yumi = value.attended;
                this.thisAttendance.push(ie);
                break;
              }
            }
         });

         // console.log(this.thisAttendance);
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
        this.http.post('./api/ACAC/AddAttendance', JSON.stringify(alist), {headers: header}).subscribe((val) => {  }, response => { },
        () => {
           this.isDisabled = true;
           window.location.reload();
        }
      );

    }
  }
