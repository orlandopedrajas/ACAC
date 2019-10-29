import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-authorize',
    templateUrl: './authorize.component.html'
})

export class AuthorizeComponent {
    code: any;

    constructor(private route: ActivatedRoute,  private http: HttpClient) {
        console.log('Called Constructor');
        this.route.queryParams.subscribe(params => {
           // tslint:disable-next-line: no-string-literal
           this.code = params['code'];

        });

        const headerJson = {'Content-Type': 'application/x-www-form-urlencoded' };
        const header = new HttpHeaders(headerJson);
        const CLIENT_ID = '638422083788996619';
        const CLIENT_SECRET = 'oUDdYfJ2ZlQIgRyYW30L6j2kqTyUTqMm';
        const REDIRECT_URI = 'http://localhost:5000/authorize';
        const API_ENDPOINT = 'https://discordapp.com/api/oauth2/token'; // ?' +
                            // 'grant_type=authorization_code&' +
                            // 'code=' + this.code + '&' +
                            // 'client_id=' + CLIENT_ID + '&' +
                            // 'client_secret=' + CLIENT_SECRET;

        const data = 'grant_type=authorization_code&' +
                     'code=' + this.code + '&' +
                     'client_id=' + CLIENT_ID + '&' +
                     'client_secret=' + CLIENT_SECRET;

        this.http.post(API_ENDPOINT, data, {headers: header})
        .subscribe((val) => { console.log(val);  }, response => {
            console.log(response);
        },
         () => {  }
         );

    }

}
