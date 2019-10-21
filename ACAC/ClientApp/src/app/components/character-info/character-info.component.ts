import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TooltipComponent } from '../tooltip/tooltip.component';


export class ItemData {
  itemname: string;
  itemid: string;
  itemdata: any;
  itemicon: string;
}

export interface ItemList {
  key: string;
  itemdata: ItemData;
}

export class Charprofile {

    name: string;
    portrait: string;
    activeclass: string;
    itemlist: ItemList[] = [];
    itemlist2: ItemList[] = [];
    avatar: string;
    freecompanyname: string;
    freecompanyslogan: string;

    constructor() {  }
    public getRaider(http: HttpClient, result: any) {

        const baseUrl = document.getElementsByTagName('base')[0].href;
        this.name = result.Character.Name;
        this.portrait = result.Character.Portrait;
        this.avatar = result.Character.Avatar;

        try { this.getItemIcon(1, 'mainhand', result.Character.GearSet.Gear.MainHand.ID, http); } catch (e) { }
        try { this.getItemIcon(2, 'head', result.Character.GearSet.Gear.Head.ID, http); } catch (e) { }
        try { this.getItemIcon(3, 'body', result.Character.GearSet.Gear.Body.ID, http); } catch (e) { }
        try { this.getItemIcon(4, 'hands', result.Character.GearSet.Gear.Hands.ID, http); } catch (e) { }
        try { this.getItemIcon(5, 'waist', result.Character.GearSet.Gear.Waist.ID, http); } catch (e) { }
        try { this.getItemIcon(6, 'legs', result.Character.GearSet.Gear.Legs.ID, http); } catch (e) { }
        try { this.getItemIcon(7, 'boots', result.Character.GearSet.Gear.Feet.ID, http); } catch (e) { }
        try { this.getItemIcon(1, 'offhand', result.Character.GearSet.Gear.OffHand.ID, http); } catch (e) { }
        try { this.getItemIcon(2, 'earring', result.Character.GearSet.Gear.Earrings.ID, http); } catch (e) { }
        try { this.getItemIcon(3, 'necklace', result.Character.GearSet.Gear.Necklace.ID, http); } catch (e) { }
        try { this.getItemIcon(4, 'bracelet', result.Character.GearSet.Gear.Bracelets.ID, http); } catch (e) { }
        try { this.getItemIcon(5, 'ring1', result.Character.GearSet.Gear.Ring1.ID, http); } catch (e) { }
        try { this.getItemIcon(6, 'ring2', result.Character.GearSet.Gear.Ring2.ID, http); } catch (e) { }
        try { this.getItemIcon(7, 'soulcrystal', result.Character.GearSet.Gear.SoulCrystal.ID, http); } catch (e) { }
        try {

        this.freecompanyname = result.FreeCompany.Name;
        this.freecompanyslogan = result.FreeCompany.Slogan;

        } catch (e) { }

    }

    delay(ms: number) {
        new Promise(resolve =>
                        setTimeout(() => resolve(), ms)).then(() =>
                        console.log('fired'));
    }

    getItemIcon(orderby, itemSlot, strItem, http: HttpClient) {
        let ida: ItemData;
        const rndnum = Math.floor(Math.random() * 100) + 1 ;
        this.delay(rndnum);
        http.get<any>('https://xivapi.com/item/' + strItem).subscribe(result => {

        ida = new ItemData();
        ida.itemdata = result;
        ida.itemid = strItem;
        ida.itemicon = 'https://xivapi.com' + result.Icon;
        ida.itemname = result.Name;

        if (itemSlot === 'mainhand' || itemSlot === 'head"'
            || itemSlot === 'head' || itemSlot === 'body'
            || itemSlot === 'hands' || itemSlot === 'waist'
            || itemSlot === 'legs' || itemSlot === 'boots') {
            this.itemlist.push({key: orderby, itemdata: ida });
            this.itemlist = this.itemlist.sort((a, b) => (a.key > b.key) ? 1 : -1);
            } else {
            this.itemlist2.push({key: orderby, itemdata: ida });
            this.itemlist2 = this.itemlist2.sort((a, b) => (a.key > b.key) ? 1 : -1);
            }

        });
    }
}

@Component({
    selector: 'app-character-info',
    templateUrl: './character-info.component.html',
    styleUrls: ['./character-info.component.css']
})

export class CharacterInfoComponent implements OnInit, OnChanges {

    @Input() characterid: string;

    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile: Charprofile;

    ngOnInit() { }

    ngOnChanges() {

      this.characterprofile = new Charprofile();
      this.http.get<any[]>('https://xivapi.com/character/' + this.characterid + '?data=fc').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(this.http, result);
      }, error => console.error(error));
    }
    constructor(public http: HttpClient, private dialog: MatDialog) {    }

    openToolTip(sitem: string) {

      let itemName: string;
      let itemIcon: string;

      this.characterprofile.itemlist.forEach((item) => {
          if (item.key === sitem) {
            itemName = item.itemdata.itemname;
            itemIcon = item.itemdata.itemicon;
          }
      });

      // tslint:disable-next-line: no-use-before-declare
      this.dialog.open(TooltipComponent, {
        data: { itemname: itemName,
                itemicon: itemIcon
              }});
    }
    openToolTip2(sitem: string) {
      let itemName: string;
      let itemIcon: string;
      this.characterprofile.itemlist2.forEach((item) => {
        if (item.key === sitem) {
          itemName = item.itemdata.itemname;
          itemIcon = item.itemdata.itemicon;
        }
      });

      // tslint:disable-next-line: no-use-before-declare
      this.dialog.open(TooltipComponent, {
        data: { itemname: itemName,
                itemicon: itemIcon
              }});
    }
}
