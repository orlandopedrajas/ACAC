import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxGalleryOptions,  NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


export interface images {
  image: string;
}

export interface image_detail {
  small: string;
  medium: string;
  big: string;
}

const image_data: images [] = [
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3eP7PfxZFQsacKL4GnPssMtNR1i5KwcPBihJ123p8i_GzD0kI8UdjrGPbc7O0untweUQCXH5uY3TwwDh4WJvEvrR_cxDqyJ-TLy2FSOF8cDN31ZGYa22UBYzMQzAIwug9FTY0-KlfMH3ovRDng82WLgXA=w3099-h1297-no?authuser=0'},
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3fMo0PfHYPR9JyhdVxlkoAQcKYmxNPN-4cpD9C4DXGyNogDR3Pm1qgzdIxBlWcxBTSc_NpkkLhTeb08-kvseFjCeLedAexHzTxZifgRTXacur0wWq7ifXk6daJyllaTrFFKUbgD4EtKL6YVWWlqygt85w=w3099-h1297-no?authuser=0'},
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3e-DmoLH7HT-q6yhp1ako4Gvx_oUbY5lv4OX0uZxkN33uWKZ5ESOykV4xQQdwTXSVidJLpeHxcDbdQkqB4FCFBm7NAgmSLyHrCDQKozGeDOHvlA94ThgS7vWo7XX4k_OVKH6-luPgqqXneE8mL_Ed5xzQ=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3dRE2AtHVpe-FC7bHMjtdQZw8sP7szywAMGjPaBPNyXgSevxGT9ouMLzDGFICISRW4Kh__VJE_3dOQcxHSeBbYVStjLlx40J66DCgeS1AseVpZRpYYtoMQmaPiTqz58bsD58dUm8NKeZdBiidZ3pZfVzw=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3dzvC_Oi65iqYPj94dljUZ8OMzxXLWBQNsqyMXQNI5pi1P85HesUkpIcvmBGJccyIyOg5pniQASlQGA21OJsoG5WkCSXAQjpzSxGHM17qa_sWRxDqL3LqQ7k6HjyVPBX10NfOOaanVNOX0DZWDSOt6ecg=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3fopi4zUoLsTNZFuCRwYp-liEMVVBAB9rBnkgAJgUki4WACE_Fr3mzDXaS1GR1h7YbJtks5YVVtStUjvViyDLuuxUkTpOpUOaF7CItydrBabQ1jTnWoQsQ1CGcnN11w8XVVUnjvB6V2KHs3Nenfw9_pPg=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3eGG4862uuJYwnX85lL-MD03fq5xFIremin9uoNpEPkaKambZt1Qxm5_wc3JIuYONAKQtuui9kLFqStuLhbV4XUYDdLyk8wFvmt4Db17sJurSAMlsGoZXs9w2O3fbuq7q2IJX-PyDa-zwIcZffxO7TDvg=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3fYR9LXoUqhGCM9AioNDG8yBPK-TSOTdv6JPy8swwJUCTQMpyEa3pqBZLThAvltdJb57eULeQUiDFlJCmi8_b-Ecb0bSiw34Cx2fJOb6uqj2J2ZucRc2vtIwpucGfjaa2DoD4m34xUwLrwZUzQyfR1wIQ=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3f556Jkh8xEZ1mUxPrr70tS2-Ljvg7_uGEP9FcuISIhB8ThypXM51aNN8idOOddCMPNvcvesACK_U9_N1pgja63S1UxdYyk89xSEC37bEXyc_dSf1JRZ7BUooV0TydJ3GgLIvPe3Au3B3MQ8HzXcrhtVw=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3dXHkBSDblE08-teA0_7kQFZkoreKkEEdtAprcW5FiGOHm1y7u_q6PlIPYC5YkB-X31wudwMPHjs7ik9Z1LWM8t5SmUBJSnkczdH8v7yE6ZlA9xM2PA6YSuBUAGNBy0tt73pFyaoBXVnpTQKz4tKf9W1w=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3eYVeCl-cX1PqrG8lwljmtAafoH1RW5XHr6MXPIoxjtf57CSlg8iYxKVPpby8DN2zQdYLwBOqGts5EBk1jOh2jlKVCILbMiKqZYPoGnfBlBvIc994cIaK-OTmqXyRyuX7r6q2LNhiQfI7qsFgsvSww8_A=w1505-h630-no?authuser=1' },
  { image: 'https://lh3.googleusercontent.com/pw/ACtC-3f88vFFPECIwd6b5IvoaxXraVBzzHt1K34KF7f4IQ86Z83g7PGeY1jtvp2p84xUcW3tHE-8nzQvmOqreI0sPIRqUfAuY4OUS6YKbyljHw95ewyUSUMkKSURloadLRQDNrr2eyYDHu4VVsvUuTgl67Zf_Q=w1505-h630-no?authuser=1' }
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  imageSource = image_data;

  constructor(public dialog: MatDialog) {  }

  ngOnInit() {

    let gi = [];

    this.imageSource.forEach(function(value){
      let img = {} as image_detail;
      img.small = value.image;
      img.big = value.image;
      img.medium = value.image;
      gi.push(img);
    })

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

}
