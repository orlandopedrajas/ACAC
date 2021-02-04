import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxGalleryOptions,  NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageDialogComponent } from '../components/image-dialog/image-dialog.component';

export interface images {
  image: string;
}

export interface image_detail {
  small: string;
  medium: string;
  big: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imageSource: any[]; // = image_data;
  imageContent: any[];

  constructor(private http: HttpClient, public dialog: MatDialog) {  }

  ngOnInit() {
    
    let gi = [];

    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetPictureByCategory?category=homepage').subscribe(result => {
      this.imageSource = result.sort((a, b) => (a.favorite < b.favorite) ? 1 : -1);
      this.imageContent = this.imageSource;
      this.imageSource.forEach(function(value){
        let img = {} as image_detail;
        img.small = value.url;
        img.big = value.url;
        img.medium = value.url;
        gi.push(img);
      })

    });

    this.galleryOptions = [
      { "previewCloseOnClick": true, "previewCloseOnEsc": true },
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: true
      }
    ];

    this.galleryImages = gi;
  }

  showImage(imageurl) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '70%',
      data: imageurl
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
