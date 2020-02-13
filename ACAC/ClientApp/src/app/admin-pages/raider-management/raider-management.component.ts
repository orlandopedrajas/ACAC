import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';

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

    thisRaider: RaiderIdentity = new RaiderIdentity();
    // tslint:disable-next-line: variable-name
    constructor(private http: HttpClient, private _SnackBar: MatSnackBar) { }

    ngOnInit() {
        if (this.thisRaider.IsAdmin() === true) {
            this.getRaiderProfiles();
        } else { window.location.href = '/'; }
    }

    getRaiderProfiles() {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
          this.raiders = result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);
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
