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

    displayedColumns: string[] = ['raiditemimg', 'raiditemname', 'hasroundrobin'];
    contentname: string;
    contentdescription: string;
    contentimg: string;
    raidContent: any[];
    raiditemimg = '/assets/img/msq.png';
    raiditemname: string;
    hasroundrobin: false;

    // tslint:disable-next-line: variable-name
    constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar) {}
    ngOnInit() {
      this.getRaidContent();
    }

    onSubmit() {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);
      if (typeof this.contentimg === 'undefined') { this.contentimg = '/assets/img/msq.png'; }
      this.http.post('./api/ACAC2/AddRaidContent',
                     JSON.stringify({contentname: this.contentname,
                                    contentdescription: this.contentdescription,
                                    contentimg: this.contentimg}),
                                    {headers: header}).subscribe(
        (val) => { }, response => { }, () => {
          const snackBarRef = this._SnackBar.open(this.contentname + ' added.', 'Done', { duration: 3000 });
          snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });
      });
    }

    getRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentname=').subscribe(result => {
        this.raidContent = result;
      });
    }

    setContentToUpdate($event) {

    }

    PostRequest(requestRoute: string, reqobj) {
      console.log(reqobj);
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);
      this.http.post('./api/ACAC2/' + requestRoute,
                     JSON.stringify(reqobj)).subscribe(
        (val) => { }, response => { }, () => {

          // const snackBarRef = this._SnackBar.open('Request Complete', 'Done', { duration: 3000 });
          // snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });
      });
    }
    addRaidItem(content) {
      console.log(content);
      let idx1 = 0;
      this.raidContent.forEach((value) => {
        if (value._raidContent.contentname === content) {
          this.raidContent[idx1]._RaidItems.push({raiditemimg: this.raiditemimg,
                                            raiditemname: this.raiditemname,
                                            hasroundrobin: this.hasroundrobin});
        }
        this.PostRequest('AddRaiditeminfo', {id: 0,
                                            contentname: value._raidContent.contentname,
                                            raiditemname: this.raiditemname,
                                            raiditemimg: this.raiditemimg,
                                            hasroundrobin: this.hasroundrobin
                                          });
        idx1 += 1;
      });
      console.log(this.raidContent);
    }
  }
