import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-add-raiditem-drop',
    templateUrl: './add-raiditem-drop.component.html',
    styleUrls: ['./add-raiditem-drop.component.scss']
  })

  export class AddRaidItemDropComponent {

    raiders: any[];
    override = false;
    receiveddate = new Date();
    raidcontentname: string;

    constructor() { }
  }
