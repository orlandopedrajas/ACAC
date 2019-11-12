import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';

export class Attendance {
    id: number;
    Eventdate: Date;
    Raidername: string;
    Attended: boolean;
}

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css']
  })

  export class AttendanceComponent {
    raiderprofiles: any[];
    raiderIdentity: ThisRaider = new RaiderIdentity(this.cookieService).Raideridentity();
    thisAttendance: any[];
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
    }

    toggleAttended(event, num) {
        this.obj[num].Attended = event.checked;
        // console.log(this.obj);
    }
    GetAttendance() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetAllAttendance').subscribe(result => {
         this.thisAttendance = result; // .sort((a, b) => (a.raidfloorname < b.raidfloorname && a.receiveddate < b.receiveddate) ? 1 : -1);
         console.log(this.thisAttendance);
       }, error => console.error(error));
    }
    SaveAttendance() {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        const alist = [];
        this.obj.forEach((value) => {
            const ae = new Attendance();
            ae.id = 0;
            ae.Raidername = value.Raidername;
            ae.Eventdate = this.CurrentDate;
            ae.Attended = value.Attended;
            alist.push(ae);
        });
        this.http.post('./api/ACAC/AddAttendance', JSON.stringify(alist), {headers: header}).subscribe((val) => {  }, response => { },
        () => {  console.log(alist); }
      );

    }
  }
