import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RaiderIdentity, ThisRaider } from '../ACACComponents';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-authorize',
    templateUrl: './authorize.component.html'
})

export class AuthorizeComponent {
    code: any;
    avatarImg: any;

    raider: ThisRaider;
    constructor(private route: ActivatedRoute,  private http: HttpClient) {

        this.route.queryParams.subscribe(params => {
           // tslint:disable-next-line: no-string-literal
           this.code = params['code'];
        });

        this.raider = new ThisRaider();
        const headerJson = {'Content-Type': 'application/x-www-form-urlencoded' };
        const header = new HttpHeaders(headerJson);
        const CLIENT_ID = '638422083788996619';
        const CLIENT_SECRET = 'oUDdYfJ2ZlQIgRyYW30L6j2kqTyUTqMm';
        const API_ENDPOINT = 'https://discordapp.com/api/oauth2/token';
        const REDIRECT_URI = environment.redirecturl;

        const data = 'grant_type=authorization_code&' +
                     'code=' + this.code + '&' +
                     'client_id=' + CLIENT_ID + '&' +
                     'client_secret=' + CLIENT_SECRET + '&' +
                     'redirect_uri=' + REDIRECT_URI ;

        this.http.post<any>(API_ENDPOINT, data, {headers: header})
        .subscribe((result) => {
             const httpOptions = {
                 headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                           Authorization: 'Bearer ' + result.access_token
                 })
             };
             this.http.get<any>('https://discordapp.com/api/users/@me', httpOptions)
             .subscribe(result1 => {
                this.raider.discorduser = result1.username;
                this.raider.discordavatar = 'https://cdn.discordapp.com/avatars/' + result1.id + '/' + result1.avatar;

                const baseUrl = document.getElementsByTagName('base')[0].href;
                this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfilesByDiscordUser?discorduser=' + result1.username)
                .subscribe(result2 => {
                    result2.forEach((value) => {
                        this.raider.IsAdmin = value.isadmin;
                        this.raider.israidmember = value.israidmember;
                        this.raider.lodestoneid = value.lodestoneid;
                        this.raider.raiderimg = value.raiderimg;
                        this.raider.raidername = value.raidername;
                        this.raider.raiderroute = value.raidername;
                    });
                    localStorage.setItem('user', JSON.stringify(this.raider));
                    window.location.href = '/raiders/' + this.raider.raiderroute;
                }, error => { });
             }, error => {
                 window.location.href = '/';
             });
         }, error => {
            window.location.href = '/';
         });

    }
}
