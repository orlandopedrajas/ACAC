import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIdentity } from '../ACACComponents';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-authorize',
    templateUrl: './authorize.component.html'
})

export class AuthorizeComponent {
    code: any;
    avatarImg: any;
    raiderIdentity: RaiderIdentity;

    constructor(private route: ActivatedRoute,  private http: HttpClient, private cookieService: CookieService) {

        this.route.queryParams.subscribe(params => {
           // tslint:disable-next-line: no-string-literal
           this.code = params['code'];
        });

        this.cookieService.deleteAll();
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
                console.log(result1);
                this.cookieService.set('discorduser', result1.username);
                this.cookieService.set('discordavatar', 'https://cdn.discordapp.com/avatars/' + result1.id + '/' + result1.avatar);
                this.raiderIdentity = new RaiderIdentity(this.cookieService);

                const baseUrl = document.getElementsByTagName('base')[0].href;
                this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfilesByDiscordUser?discorduser=' + result1.username)
                .subscribe(result2 => {
                    result2.forEach((value) => {
                        this.cookieService.set('isadmin', value.isadmin);
                        this.cookieService.set('israidmember', value.israidmember);
                        this.cookieService.set('lodestoneid', value.lodestoneid);
                        this.cookieService.set('raiderimg', value.raiderimg);
                        this.cookieService.set('raidername', value.raidername);
                        this.cookieService.set('raiderroute', value.raidername);
                    });
                    window.location.href = '/raiders/' + this.raiderIdentity.Raideridentity().raiderroute;
                }, error => { });
             }, error => {
                 console.log(error);
                 this.cookieService.delete('discorduser', '/');
                 this.cookieService.delete('discordavatar', '/');
                 this.cookieService.deleteAll('/');
                 window.location.href = '/';
             });
         }, error => {
            console.log(error);
            this.cookieService.delete('discorduser', '/');
            this.cookieService.delete('discordavatar', '/');
            this.cookieService.deleteAll('/');
            window.location.href = '/';
         });

    }
}
