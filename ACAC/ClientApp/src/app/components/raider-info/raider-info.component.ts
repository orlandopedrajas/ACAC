import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-raider-info',
    templateUrl: './raider-info.component.html',
    styleUrls: ['./raider-info.component.scss']
})

export class RaiderInfoComponent implements OnChanges {

    @Input() raiders: any[];

    constructor(private http: HttpClient) { }

    ngOnChanges() { }

    onAdmintoggle(element) {
        this.PostRequest('Upsertuserprofile', {
                                               raidername: element.raidername,
                                               raiderimg: element.raiderimg,
                                               isadmin: element.isadmin,
                                               lodestoneid: element.lodestoneid,
                                               israidmember: element.israidmember,
                                               discorduser: element.discorduser
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
            discorduser: element.discorduser
           });
        }, error => console.error(error));
    }
}
