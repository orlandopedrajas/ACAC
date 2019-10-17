import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Charprofile {
    name: string;
    portrait: string;
    activeclass: string;
    mainhand: string;
    head: string;
    body: string;
    hands: string;
    waist: string;
    legs: string;
    boots: string;
    offhand: string;
    earring: string;
    necklace: string;
    bracelet: string;
    ring1: string;
    ring2: string;
    avatar: string;
    soulcrystal: string;
    SavageItems: any[];

    constructor() {    }
    public getRaider(http: HttpClient, result: any) {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.name = result.Character.Name;
        this.portrait = result.Character.Portrait;
        this.avatar = result.Character.Avatar;

        try { this.getItemIcon('mainhand', result.Character.GearSet.Gear.MainHand.ID, http); } catch (e) { }
        try { this.getItemIcon('head', result.Character.GearSet.Gear.Head.ID, http); } catch (e) { }
        try { this.getItemIcon('body', result.Character.GearSet.Gear.Body.ID, http); } catch (e) { }
        try { this.getItemIcon('hands', result.Character.GearSet.Gear.Hands.ID, http); } catch (e) { }
        try { this.getItemIcon('waist', result.Character.GearSet.Gear.Waist.ID, http); } catch (e) { }
        try { this.getItemIcon('legs', result.Character.GearSet.Gear.Legs.ID, http); } catch (e) { }
        try { this.getItemIcon('boots', result.Character.GearSet.Gear.Feet.ID, http); } catch (e) { }
        try { this.getItemIcon('offhand', result.Character.GearSet.Gear.OffHand.ID, http); } catch (e) { }
        try { this.getItemIcon('earring', result.Character.GearSet.Gear.Earrings.ID, http); } catch (e) { }
        try { this.getItemIcon('necklace', result.Character.GearSet.Gear.Necklace.ID, http); } catch (e) { }
        try { this.getItemIcon('bracelet', result.Character.GearSet.Gear.Bracelets.ID, http); } catch (e) { }
        try { this.getItemIcon('ring1', result.Character.GearSet.Gear.Ring1.ID, http); } catch (e) { }
        try { this.getItemIcon('ring2', result.Character.GearSet.Gear.Ring2.ID, http); } catch (e) { }
        try { this.getItemIcon ('soulcrystal', result.Character.GearSet.Gear.SoulCrystal.ID, http); } catch (e) { }

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=' + this.name).subscribe(result1 => {
          this.SavageItems = result1;
        }, error => console.error(error));
    }

    getItemIcon(itemSlot, strItem, http: HttpClient) {
        http.get<any>('https://xivapi.com/item/' + strItem).subscribe(result => {
          switch (itemSlot) {
            case 'mainhand': {
              this.mainhand = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'head': {
              this.head = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'body': {
              this.body = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'hands': {
              this.hands = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'waist': {
              this.waist = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'legs': {
              this.legs = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'boots': {
              this.boots = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'offhand': {
              this.offhand = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'earring': {
              this.earring = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'necklace': {
              this.necklace = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'bracelet': {
              this.bracelet = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'ring1': {
              this.ring1 = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'ring2': {
              this.ring2 = 'https://xivapi.com' + result.Icon;
              break;
            }
            case 'soulcrystal': {
              this.soulcrystal = 'https://xivapi.com' + result.Icon;
              break;
            }
          }
        });
    }
}

@Component({
    selector: 'app-lan-mantear',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})

export class LanMantearComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/9401374').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }
}

@Component({
    selector: 'app-aerilyn-elessedil',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})
export class AerilynElessedilComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/4477459').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }
}

@Component({
    selector: 'app-hades-carmine',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
  })

  export class HadesCarmineComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/10525190').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }
}

@Component({
  selector: 'app-la-ki',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class LaKiComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/24166474').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
}
