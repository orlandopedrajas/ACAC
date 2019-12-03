import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-raider-management',
    templateUrl: './raider-management.component.html',
    styleUrls: ['./raider-management.component.scss']
})

export class RaiderManagementComponent implements OnInit {

    raiders: any[];

    raidername: string;
    discorduser: string;
    lodestoneid: string;
    isadmin: false;

    // tslint:disable-next-line: variable-name
    constructor(private http: HttpClient, private _SnackBar: MatSnackBar) { }

    ngOnInit() { this.getRaiderProfiles(); }

    getRaiderProfiles() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
          this.raiders = result;
        });
    }

    onSubmit() {
        this.PostRequest('Upsertuserprofile', {
                                                raidername: this.raidername,
                                                raiderimg: 'assets/img/no-profile.png',
                                                isadmin: this.isadmin,
                                                lodestoneid: this.lodestoneid,
                                                discorduser: this.discorduser
                                              });
        window.location.reload();
    }

    PostRequest(requestRoute: string, reqobj) {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC2/' + requestRoute,
                       JSON.stringify(reqobj),
                       {headers: header}).subscribe(
          (val) => { }, response => { }, () => {

        });
    }
}