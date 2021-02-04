import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaiderIdentity, ThisRaider } from '../../components/ACACComponents';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';

@Component({
    selector: 'app-picture-album',
    templateUrl: './picture-album.component.html',
    styleUrls: ['./picture-album.component.scss']
  })

  export class picturealbumComponent implements OnInit {

    thisRaider: RaiderIdentity = new RaiderIdentity();
    displayedColumns: string[] = ['Image'];

    imageContent: any[];

    constructor(private http: HttpClient, private _bottomSheet: MatBottomSheet, private _SnackBar: MatSnackBar, public dialog: MatDialog) { }

    ngOnInit() {
      this.getPicturebyCategory('homepage');
       // if (this.thisRaider.IsAdmin() === true) {
      //    this.getPicturebyCategory('homepage');
       // } else { window.location.href = '/'; }
    }

    openBottomSheet(): void {
      this._bottomSheet.open(bottomsheetpicturealbum);
    }

    getPicturebyCategory(category) {
      const baseUrl = document.getElementsByTagName('base')[0].href;
      this.http.get<any[]>(baseUrl + 'api/ACAC2/GetPictureByCategory?category=' + category).subscribe(result => {
        this.imageContent = result.sort((a, b) => (a.favorite < b.favorite) ? 1 : -1);
      });
    }

    toggleFavorite(id) {
      const headerJson = {'Content-Type': 'application/json'};
      const header = new HttpHeaders(headerJson);
      this.http.post('./api/ACAC2/ToggleFavorite', JSON.stringify(id), {headers: header}).subscribe((val) => {  }, response => { },
        () => { this.getPicturebyCategory("homepage"); }
      );
    }

    deletePicture(id) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Delete Picture?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const headerJson = {'Content-Type': 'application/json'};
          const header = new HttpHeaders(headerJson);
          this.http.post('./api/ACAC2/DeletePicture', JSON.stringify(id), 
            {headers: header}).subscribe((val) => {  }, response => { },
            () => {
              const snackBarRef = this._SnackBar.open('Picture Deleted.', 'Done', { duration: 300 });
              snackBarRef.afterDismissed().subscribe(() => { this.getPicturebyCategory("homepage"); });
             }
          );
        }
      });
    }

    showImage(imageurl) {
      const dialogRef = this.dialog.open(ImageDialogComponent, {
        width: '90%',
        data: imageurl
      });
      dialogRef.afterClosed().subscribe(result => { });
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

  @Component({
    selector: 'bottom-sheet-picturealbum',
    templateUrl: './bottom-sheet-picturealbum.html'
  })
  
  export class bottomsheetpicturealbum {
    constructor (private http: HttpClient, private _SnackBar: MatSnackBar, private _bottomSheetRef: MatBottomSheetRef<picturealbumComponent>){}

    url: string;
    category: string = "homepage";
      
    onSubmit() {

      this.PostRequest('AddPicture', {url: this.url,
                                      category: this.category,
                                      favorite: false });

      const snackBarRef = this._SnackBar.open(this.url + ' added.', 'Done', { duration: 300 });
      snackBarRef.afterDismissed().subscribe(() => { location.reload();  });

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