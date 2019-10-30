import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';

export class Jobalt {
    raidername: string;
    alt1: string;
    alt2: string;
}

@Component({
  selector: 'app-alternate-jobs',
  templateUrl: './alternate-jobs.component.html',
  styleUrls: ['./alternate-jobs.component.css']
})

export class AlternateJobsComponent {

    alternatejobs: any[];
    displayedColumns: string[] = ['raidername', 'alt1', 'alt2'];
    raiders: string[] = ['Aerilyn Elessedil',
                         'Hades Carmine',
                         'La Ki',
                         'Lan Mantear',
                         'Shelly Duncan',
                         'Thomas Silverstar',
                         'Val Phoenix',
                         'Yumi Rin'];
    jobs: string[] = ['Paladin', 'Warrior', 'Dark Knight', 'Gunbreaker',
                      'Monk', 'Dragoon', 'Ninja', 'Samurai',
                      'Bard', 'Machinist', 'Dancer',
                      'Black Mage', 'Summoner', 'Red Mage',
                      'White Mage', 'Scholar', 'Astrologian'];

    JAlt = new Jobalt();
    isAdmin: boolean;

    IsAdmin(): boolean {
        const discorduser = this.cookieService.get('discorduser');
        if (discorduser.length === 0) {
            this.cookieService.deleteAll();
            return false;
        } else {
            if (discorduser === 'Lan Mantear') { return true;
            } else { return false; }
        }
    }

    constructor(private cookieService: CookieService, private http: HttpClient, private _SnackBar: MatSnackBar, public dialog: MatDialog) {
        //console.log(this.JAlt);
        this.isAdmin = this.IsAdmin();
        this.getJobAlternates();
    }

    getJobAlternates() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      // tslint:disable-next-line: max-line-length
      this.http.get<{ raidername: string, raiderimg: string, raiderbanner: string, pageroute: string }[]>(baseUrl + 'api/ACAC/GetAllProfiles').subscribe(result1 => {
        this.http.get<any[]>(baseUrl + 'api/ACAC/GetAllJOBAlternates').subscribe(result => {
            this.alternatejobs = [];
            result.forEach((value) => {
                let a = result1.filter(r => r.raidername === value.raidername);
                this.alternatejobs.push({raidername: value.raidername,
                                         alt1: value.alt1,
                                         alt2: value.alt2,
                                         raiderimg: a[0].raiderimg,
                                         raiderbanner: a[0].raiderbanner,
                                         pageroute: a[0].pageroute });
            });
            //console.log(this.alternatejobs);
           }, error => console.error(error));
        });

    }

    onSubmit() {
        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC/AddJobAlt', JSON.stringify(this.JAlt), {headers: header}).subscribe(
            (val) => { }, response => { }, () => { });

        const snackBarRef = this._SnackBar.open('Alts added for ' + this.JAlt.raidername, 'Done',
        { duration: 3000 });
        snackBarRef.afterDismissed().subscribe(() => {
            this.getJobAlternates();

        });
    }
}
