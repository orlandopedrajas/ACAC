import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { RaiderIdentity, ThisRaider } from '../components/ACACComponents';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

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

    enableedit = false;
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
    raiderIdentity: ThisRaider = new RaiderIdentity(this.cookieService).Raideridentity();

    constructor(private cookieService: CookieService, private http: HttpClient,
                // tslint:disable-next-line: variable-name
                private _SnackBar: MatSnackBar, public dialog: MatDialog) {
        this.jobs = this.jobs.sort((a, b) => (a > b) ? 1 : -1);
        this.getJobAlternates();
    }

    onEnableEdit(raider) {
        // console.log(raider);
        // console.log(this.raiderIdentity.raidername);
        if (this.raiderIdentity.raidername === raider) {
            this.enableedit = true;
        } else { this.enableedit = false; }
        // console.log(this.enableedit);
    }
    getJobAlternates() {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      // tslint:disable-next-line: max-line-length
      this.http.get<{ raidername: string, raiderimg: string, pageroute: string, israidmember: any }[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result1 => {
        // console.log(result1);
        this.raiders = [];
        result1.filter(r => r.israidmember === true).sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
            this.raiders.push(value.raidername);
        });

        this.http.get<any[]>(baseUrl + 'api/ACAC2/GetAllJOBAlternates').subscribe(result => {

            this.alternatejobs = [];
            result.sort((a, b) => (a.raidername > b.raidername) ? 1 : -1).forEach((value) => {
                const a = result1.filter(r => r.raidername === value.raidername);
                this.alternatejobs.push({raidername: value.raidername,
                                         alt1: value.alt1,
                                         alt1img: this.getJobIcon(value.alt1),
                                         hasalt1: value.hasalt1,
                                         hasalt2: value.hasalt2,
                                         alt2img: this.getJobIcon(value.alt2),
                                         alt2: value.alt2,
                                         raiderimg: a[0].raiderimg,
                                         pageroute: '/raiders/' + a[0].raidername });
            });
            console.log(this.alternatejobs);
           }, error => console.error(error));
        });

    }

    getJobIcon(job): string {

        switch (job) {
            case 'Dark Knight': {
                return 'https://xivapi.com/cj/1/darkknight.png';
            }
            case 'Paladin': {
                return 'https://xivapi.com/cj/1/paladin.png';
            }
            case 'Warrior': {
                return 'https://xivapi.com/cj/1/warrior.png';
            }
            case 'Gunbreaker': {
                return 'https://xivapi.com/cj/1/gunbreaker.png';
            }
            case 'Monk': {
                return 'https://xivapi.com/cj/1/monk.png';
            }
            case 'Dragoon': {
                return 'https://xivapi.com/cj/1/dragoon.png';
            }
            case 'Ninja': {
                return 'https://xivapi.com/cj/1/ninja.png';
            }
            case 'Samurai': {
                return 'https://xivapi.com/cj/1/samurai.png';
            }
            case 'Bard': {
                return 'https://xivapi.com/cj/1/bard.png';
            }
            case 'Machinist': {
                return 'https://xivapi.com/cj/1/machinist.png';
            }
            case 'Dancer': {
                return 'https://xivapi.com/cj/1/dancer.png';
            }
            case 'Black Mage': {
                return 'https://xivapi.com/cj/1/blackmage.png';
            }
            case 'Summoner': {
                return 'https://xivapi.com/cj/1/summoner.png';
            }
            case 'Red Mage': {
                return 'https://xivapi.com/cj/1/redmage.png';
            }
            case 'White Mage': {
                return 'https://xivapi.com/cj/1/whitemage.png';
            }
            case 'Scholar': {
                return 'https://xivapi.com/cj/1/scholar.png';
            }
            case 'Astrologian': {
                return 'https://xivapi.com/cj/1/astrologian.png';
            }

            default: { return job; }
        }
    }

    onSubmit() {

        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC2/AddJobAlt', JSON.stringify(this.JAlt), {headers: header}).subscribe(
            (val) => { }, response => { }, () => { });

        const snackBarRef = this._SnackBar.open('Alts added for ' + this.JAlt.raidername, 'Done',
        { duration: 3000 });
        snackBarRef.afterDismissed().subscribe(() => {
            this.getJobAlternates();
        });
    }

    deleteJA(raidername) {

        if (this.raiderIdentity.IsAdmin) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '350px',
                data: 'Delete Job alternate for ' + raidername + '?'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    const headerJson = {'Content-Type': 'application/json'};
                    const header = new HttpHeaders(headerJson);
                    this.http.post('./api/ACAC2/DeleteJobalternate', JSON.stringify(raidername), {headers: header}).subscribe(
                        (val) => { }, response => { }, () => { });

                    const snackBarRef = this._SnackBar.open('Alts Entry removed for ' + raidername, 'Done',
                    { duration: 3000 });
                    snackBarRef.afterDismissed().subscribe(() => {
                        this.getJobAlternates();
                    });
                }
              });
        }
    }
    onAltchange(raider, alt1, alt2) {
        this.enableedit = false;

        const j = new Jobalt();
        j.raidername = raider;
        j.alt1 = alt1;
        j.alt2 = alt2;

        const headerJson = {'Content-Type': 'application/json'};
        const header = new HttpHeaders(headerJson);
        this.http.post('./api/ACAC2/AddJobAlt', JSON.stringify(j), {headers: header}).subscribe(
        (val) => { }, response => { }, () => { });

        const snackBarRef = this._SnackBar.open('Alts updated for ' + j.raidername, 'Done',
        { duration: 3000 });
        snackBarRef.afterDismissed().subscribe(() => {
           this.getJobAlternates();
        });

    }
}
