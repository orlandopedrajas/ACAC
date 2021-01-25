import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';

@Component({
    selector: 'app-picture-album',
    templateUrl: './picture-album.component.html',
    styleUrls: ['./picture-album.component.scss']
  })

  export class picturealbumComponent implements OnInit {

    thisRaider: RaiderIdentity = new RaiderIdentity();

    constructor(private http: HttpClient, private _SnackBar: MatSnackBar) { }

    ngOnInit() {
        if (this.thisRaider.IsAdmin() === true) {

        } else { window.location.href = '/'; }
    }

  }