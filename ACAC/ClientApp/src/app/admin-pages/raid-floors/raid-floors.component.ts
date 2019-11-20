import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-raid-floors',
    templateUrl: './raid-floors.component.html',
    styleUrls: ['./raid-floors.component.css']
  })

  export class RaidFloorComponent implements OnInit {

    contentname: string;
    contentdescription: string;
    raidContent: any[];

    // tslint:disable-next-line: variable-name
    constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar) {}
    ngOnInit() {

    }

    onSubmit() {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);

      this.raidContent = [];
      this.raidContent.push({contentname: this.contentname,
                             contentdescription: this.contentdescription});
      this.http.post('./api/ACAC/AddRaidContent', JSON.stringify(this.raidContent), {headers: header}).subscribe(
        (val) => { }, response => { }, () => {
          const snackBarRef = this._SnackBar.open(this.contentname + ' added.', 'Done', { duration: 3000 });
          snackBarRef.afterDismissed().subscribe(() => { });
      });
    }

    getRaidContent() {

    }
  }
