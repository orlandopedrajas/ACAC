import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-fflog',
    templateUrl: './fflog.component.html',
    styleUrls: ['./fflog.component.css']
})

export class FFLOGComponent implements OnInit, OnChanges {

    @Input() charactername: string;
    @Input() server: string;
    displayedColumns: string[] = ['encounterName', 'percentile', 'total'];

    savagefloors: any[] = null;
    constructor(private http: HttpClient) {  }

    ngOnInit() {  }
    ngOnChanges() {

        let savage: any[];

        this.http.get<any[]>('https://www.fflogs.com:443/v1/rankings/character/' + this.charactername + '/' + this.server +
                             '/na?api_key=d78a1442a8cde44d443fc2decd89f199')
        .subscribe(result => {
          this.savagefloors = [];
          savage = result.filter( r => r.difficulty === 101 && r.encounterID === 65)
                              .sort((a, b) => (a.percentile < b.percentile) ? 1 : -1);
          this.savagefloors.push(savage[0]);

          savage = result.filter( r => r.difficulty === 101 && r.encounterID === 66)
                              .sort((a, b) => (a.percentile < b.percentile) ? 1 : -1);
          this.savagefloors.push(savage[0]);

          savage = result.filter( r => r.difficulty === 101 && r.encounterID === 67)
                              .sort((a, b) => (a.percentile < b.percentile) ? 1 : -1);
          this.savagefloors.push(savage[0]);

          savage = result.filter( r => r.difficulty === 101 && r.encounterID === 68)
                              .sort((a, b) => (a.percentile < b.percentile) ? 1 : -1);
          this.savagefloors.push(savage[0]);

          console.log(this.savagefloors);
        }, error => console.error(error));

     }
}
