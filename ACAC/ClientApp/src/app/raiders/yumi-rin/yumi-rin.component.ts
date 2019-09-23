import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-yumi-rin',
  templateUrl: './yumi-rin.component.html',
  styleUrls: ['./yumi-rin.component.css']
})

export class YumiRinComponent {
    SavageItems: SavageItem[];

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get<SavageItem[]>(baseUrl + 'api/ItemDrop/ItemHistoryByRaider?xRaider=Yumi Rin').subscribe(result => {
       this.SavageItems = result;
     }, error => console.error(error));
    }
  }
  interface SavageItem {
    dateReceived: string;
    floor: string;
    raider: string;
    droptype: string;
  }