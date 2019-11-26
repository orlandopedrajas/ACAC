import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

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
    color = 'primary';

    // tslint:disable-next-line: variable-name
    constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar, public dialog: MatDialog) {}
    ngOnInit() {
      this.getRaidContent();
    }

    onSubmit() {

      this.PostRequest('AddRaidContent', {contentname: this.contentname,
                                          contentdescription: this.contentdescription,
                                          contentimg: this.contentimg});

      const snackBarRef = this._SnackBar.open(this.contentname + ' added.', 'Done', { duration: 3000 });
      snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });

    }

    getRaidContent() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaidContent?contentname=').subscribe(result => {
        this.raidContent = result;
        console.log(this.raidContent);
      });
    }

    setContentToUpdate($event) {

    }
    onRoundrobinCheck(element) {
     //  console.log(element.hasroundrobin, hasroundrobin);
      this.PostRequest('UpdateRaiditeminfo', {id: element.id,
                                              contentid: element.contentid,
                                              raiditemname: element.raiditemname,
                                              raiditemimg: element.raiditemimg,
                                              hasroundrobin: !element.hasroundrobin
                                            });
    }
    onblur(content) {
    //  console.log(content);
      this.PostRequest('UpdateRaidContent', { contentname: content._raidContent.contentname,
                                              contentid: content._raidContent.contentid,
                                              contentdescription: content._raidContent.contentdescription,
                                              contentimg: content._raidContent.contentimg});

     // const snackBarRef = this._SnackBar.open(content.contentname + ' updated.', 'Done', { duration: 3000 });
     // snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });

    }
    OnRemoveItem(id) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Remove this item?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const headerJson = {'Content-Type': 'application/json'};
          const header = new HttpHeaders(headerJson);
          this.http.post('./api/ACAC2/DeleteRaiditeminfo', JSON.stringify(id), {headers: header}).subscribe((val) => {  }, response => { },
            () => {
              const snackBarRef = this._SnackBar.open('Item Deleted', 'Done', { duration: 3000 });
              snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });
             }
          );
        }
      });
    }

    PostRequest(requestRoute: string, reqobj) {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);
      this.http.post('./api/ACAC2/' + requestRoute,
                     JSON.stringify(reqobj),
                     {headers: header}).subscribe(
        (val) => { }, response => { }, () => {
          // this.getRaidContent();
      });
    }

    addRaidItem(content) {

      let idx1 = 0;
      this.raidContent.forEach((value) => {
        if (value._raidContent.contentname === content) {
          this.raidContent[idx1]._RaidItems.push({raiditemimg: this.raiditemimg,
                                            raiditemname: this.raiditemname,
                                            hasroundrobin: this.hasroundrobin});
          this.PostRequest('AddRaiditeminfo', {id: 0,
                                            contentid: value._raidContent.contentid,
                                            raiditemname: this.raiditemname,
                                            raiditemimg: this.raiditemimg,
                                            hasroundrobin: this.hasroundrobin
                                          });
          const snackBarRef = this._SnackBar.open(value._raidContent.contentname + ' added.', 'Done', { duration: 3000 });
          snackBarRef.afterDismissed().subscribe(() => { this.getRaidContent(); });
        }
        idx1 += 1;
      });
    }
  }
