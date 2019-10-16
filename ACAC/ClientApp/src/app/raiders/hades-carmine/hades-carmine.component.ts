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
}

@Component({
  selector: 'app-hades-carmine',
  templateUrl: './hades-carmine.component.html',
  styleUrls: ['./hades-carmine.component.css']
})

export class HadesCarmineComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();
  SavageItems: any[];

  constructor(private http: HttpClient) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/10525190').subscribe(newObj => {

      const result: any = newObj;
      this.characterprofile.name = result.Character.Name;
      this.characterprofile.portrait = result.Character.Portrait;
      this.characterprofile.avatar = result.Character.Avatar;
      const a = result.Character.ActiveClassJob.Name.toUpperCase();
      try { this.getItemIcon('mainhand', result.Character.GearSet.Gear.MainHand.ID); } catch (e) { }
      try { this.getItemIcon('head', result.Character.GearSet.Gear.Head.ID); } catch (e) { }
      try { this.getItemIcon('body', result.Character.GearSet.Gear.Body.ID); } catch (e) { }
      try { this.getItemIcon('hands', result.Character.GearSet.Gear.Hands.ID); } catch (e) { }
      try { this.getItemIcon('waist', result.Character.GearSet.Gear.Waist.ID); } catch (e) { }
      try { this.getItemIcon('legs', result.Character.GearSet.Gear.Legs.ID); } catch (e) { }
      try { this.getItemIcon('boots', result.Character.GearSet.Gear.Feet.ID); } catch (e) { }
      try { this.getItemIcon('offhand', result.Character.GearSet.Gear.OffHand.ID); } catch (e) { }
      try { this.getItemIcon('earring', result.Character.GearSet.Gear.Earrings.ID); } catch (e) { }
      try { this.getItemIcon('necklace', result.Character.GearSet.Gear.Necklace.ID); } catch (e) { }
      try { this.getItemIcon('bracelet', result.Character.GearSet.Gear.Bracelets.ID); } catch (e) { }
      try { this.getItemIcon('ring1', result.Character.GearSet.Gear.Ring1.ID); } catch (e) { }
      try { this.getItemIcon('ring2', result.Character.GearSet.Gear.Ring2.ID); } catch (e) { }
      try { this.getItemIcon ('soulcrystal', result.Character.GearSet.Gear.SoulCrystal.ID); } catch (e) { }

      http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=' + this.characterprofile.name).subscribe(result1 => {
        this.SavageItems = result1;
      }, error => console.error(error));

    }, error => console.error(error));
  }

   getItemIcon(itemSlot, strItem) {
    this.http.get<any>('https://xivapi.com/item/' + strItem).subscribe(result => {
      switch (itemSlot) {
        case 'mainhand': {
          this.characterprofile.mainhand = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'head': {
          this.characterprofile.head = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'body': {
          this.characterprofile.body = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'hands': {
          this.characterprofile.hands = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'waist': {
          this.characterprofile.waist = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'legs': {
          this.characterprofile.legs = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'boots': {
          this.characterprofile.boots = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'offhand': {
          this.characterprofile.offhand = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'earring': {
          this.characterprofile.earring = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'necklace': {
          this.characterprofile.necklace = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'bracelet': {
          this.characterprofile.bracelet = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'ring1': {
          this.characterprofile.ring1 = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'ring2': {
          this.characterprofile.ring2 = 'https://xivapi.com' + result.Icon;
          break;
        }
        case 'soulcrystal': {
          this.characterprofile.soulcrystal = 'https://xivapi.com' + result.Icon;
          break;
        }
      }
    });
  }
}
