import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-raider-info',
    templateUrl: './raider-info.component.html',
    styleUrls: ['./raider-info.component.scss']
})

export class RaiderInfoComponent implements OnChanges {

    @Input() raiders: any[];

    constructor(private http: HttpClient,private _SnackBar: MatSnackBar, public dialog: MatDialog) { }

    ngOnChanges() { }

    onAdmintoggle(element) {
        this.PostRequest('Upsertuserprofile', {
                                               raidername: element.raidername,
                                               raiderimg: element.raiderimg,
                                               isadmin: element.isadmin,
                                               lodestoneid: element.lodestoneid,
                                               israidmember: element.israidmember,
                                               discorduser: element.discorduser,
                                               isninemember: element.isninemember
                                              });
    }

    PostRequest(requestRoute: string, reqobj) {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC2/' + requestRoute, JSON.stringify(reqobj),
        {headers: header}).subscribe((val) => { }, response => { }, () => { });
    }

    resetImage(element) {
        this.http.get<any[]>('https://xivapi.com/character/' + element.lodestoneid + '?data=fc&extended=1')
        .subscribe(newObj => {
          const result: any = newObj;
          this.PostRequest('Upsertuserprofile', {
            raidername: element.raidername,
            raiderimg: result.Character.Avatar,
            isadmin: element.isadmin,
            lodestoneid: element.lodestoneid,
            israidmember: element.israidmember,
            discorduser: element.discorduser,
            isninemember: element.isninemember
           });

        }, error => console.error(error));
    }

    deleteraider(element) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: 'Delete ' + element.raidername + '?'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const headerJson = {'Content-Type': 'application/json'};
              const header = new HttpHeaders(headerJson);
              this.http.post('./api/ACAC2/DeleteRaider', JSON.stringify(element.raidername), 
                                                                          {headers: header}).subscribe((val) => {  },
                                                                           response => { },
                () => {
                  const snackBarRef = this._SnackBar.open('Raider Deleted', 'Done', { duration: 500 });
                  snackBarRef.afterDismissed().subscribe(() => { location.reload(); });
                 }
              );
            }
          });
    }
}
