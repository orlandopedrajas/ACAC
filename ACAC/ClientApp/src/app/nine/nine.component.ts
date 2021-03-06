import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions,  NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


export interface image { 
    thumbnailUrl: string;
    previewUrl: string;
}

@Component({
  selector: 'app-nine',
  templateUrl: './nine.component.html',
  styleUrls: ['./nine.component.css']
})

export class NineComponent implements OnInit {

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    ninemember: any[];
    ninename: string;
    routeparam = '';
    selected = 0;


    

    tabChanged(event) {
        this.ninename = this.ninemember[event.index].raidername;
    }
    
  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  ngOnInit() {
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

    this.galleryImages = [
      {
        small: 'https://lh3.googleusercontent.com/pw/ACtC-3enBw3IVg29wyP2DiF8Owbr49LCLjswiuFaB20130zcNDcJuMWLNspR1I3xk6YOiXrR0s8nej5hZakxzWs1VNUB0h7qPcxPJ5WxcebB7EL0gtqXpX2tlN3Ueh-eIUbV0unXro8mn6Rp7pgwl4_7l_k6oA=w1505-h630-no?authuser=1',
        medium: 'https://lh3.googleusercontent.com/pw/ACtC-3enBw3IVg29wyP2DiF8Owbr49LCLjswiuFaB20130zcNDcJuMWLNspR1I3xk6YOiXrR0s8nej5hZakxzWs1VNUB0h7qPcxPJ5WxcebB7EL0gtqXpX2tlN3Ueh-eIUbV0unXro8mn6Rp7pgwl4_7l_k6oA=w1505-h630-no?authuser=1',
        big: 'https://lh3.googleusercontent.com/pw/ACtC-3enBw3IVg29wyP2DiF8Owbr49LCLjswiuFaB20130zcNDcJuMWLNspR1I3xk6YOiXrR0s8nej5hZakxzWs1VNUB0h7qPcxPJ5WxcebB7EL0gtqXpX2tlN3Ueh-eIUbV0unXro8mn6Rp7pgwl4_7l_k6oA=w1505-h630-no?authuser=1',
      },
      {
        small: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        medium: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        big: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
      },
      {
        small: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        medium: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        big: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
      },
      {
        small: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        medium: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        big: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
      },
      {
        small: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        medium: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        big: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
      },
      {
        small: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        medium: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
        big: 'https://lh3.googleusercontent.com/5B7-f4o_S4pEDJYE6etdU-zvo4kaXXysSk-XHcnBmMhocye4vexYcrltutOS0FTpxTEZ5sdrbWfxwe9NraI1TI_Mt9Pr-aXTamA9meq2v7m3_8d9UB3ZUVp4l4HrLPLJ_zOtc5nBLKRJqwcUgUYq06M5ryHrQsomFrOhwzODdLG7SvBljNFxk7jCn-1uLbv4XEnG8CxrRSIdYr6l-ybv7fFWyjm5QoEhHGzDdbJOEXwbCbt-qKHyTI_kWhOf3AGevuiheiEntUDkC1Auah6S-Bp7DQyQ1KIpi3IdarYUrSjpXR2kUbXkd9UHFrjSo6Gqyb9eD2gDLxIARvwIY6jpyg0WJNHTLtvk-KzGLYV1WOt1txJPfJkx5qg73BeMWIbn_6SO8HMSTLL3hyqry_afbRa3eA8Plcg6k1UuRUDMhWAzwjn547vmgPMb-1IH6orO3EOejYmjIhnV01XjxLZyqjCb8oe_EjeWY0pkAyC49sFUBZoaJ4cqgw5klLRfH_uebsigbXrP2FgjDgLruXndj0X-XwnSdmI3CrXOkS9ZQmL7vQJOS4A6Tr-a5FruwfhxRekFwP3-gWpvbiwy1zk1esv2vevRRnjwSeu4B1HRBZi-zEEZ4j8aoX1buSI0se36b3BWvXMjUIUQ56InjsMzDk9tIvPHwJe6b6MzcHEILEoFdH6En0tMuF5VBjh-wBM3Xhq7O_6VKakPDVepDAS7WPerCXaUGnsMW7RABdUwuhtwv_W2BA=w1670-h937-no',
      },
    ];
    this.GetRaiders();
  }

  GetRaiders() {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    this.http.get<any[]>(baseUrl + 'api/ACAC2/GetRaiderProfiles?raidername=').subscribe(result => {
        this.ninemember = result.filter(r => r.isninemember === true).sort((a, b) => (a.raidername > b.raidername) ? 1 : -1);     
    });
  }

}
