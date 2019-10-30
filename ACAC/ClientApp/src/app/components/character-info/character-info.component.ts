import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TooltipComponent } from '../tooltip/tooltip.component';


export class ItemData {
  itemname: string;
  itemid: string;
  itemdata: any;
  itemicon: string;
  itemuicategory: string;
  itemlevel: string;
  levelequip: string;
  canbehq: number;
  damage: number;
  autoattack: number;
  delay: number;
  stats: any[] = [];
}

export class Gear {
  name: string;
  id: string;
  icon: string;
  category: string;
  classjobcategory: string;
}
export interface ItemList {
  id: string;
  itemdata: ItemData;
  levelequip: string;
  levelitem: string;
}

export class Charprofile {

    name: string;
    level: string;
    portrait: string;
    activeclass: string;
    itemlist: ItemList[] = [];
    itemlist2: ItemList[] = [];
    avatar: string;
    server: string;
    dc: string;
    freecompanyname: string;
    freecompanyslogan: string;
    jobicon: string;
    mainhand: any;
    head: any;
    body: any;
    hands: any;
    waist: any;
    legs: any;
    feet: any;
    offhand: any;
    earrings: any;
    necklace: any;
    bracelets: any;
    ring1: any;
    ring2: any;
    soulcrystal: any;

    constructor() {  }
    public getRaider(http: HttpClient, result: any) {

        this.name = result.Character.Name;
        this.server = result.Character.Server;
        this.dc = result.Character.DC;
        this.portrait = result.Character.Portrait;
        this.avatar = result.Character.Avatar;
        this.level = result.Character.ActiveClassJob.Level;
        this.activeclass = result.Character.ActiveClassJob.Name.toUpperCase();
        this.jobicon = 'https://xivapi.com' + result.Character.ActiveClassJob.Job.Icon;

        try { this.mainhand = this.EvaluateGear(result.Character.GearSet.Gear.MainHand); } catch (e) { }
        try { this.head = this.EvaluateGear(result.Character.GearSet.Gear.Head); } catch (e) { }
        try { this.body = this.EvaluateGear(result.Character.GearSet.Gear.Body); } catch (e) { }
        try { this.hands = this.EvaluateGear(result.Character.GearSet.Gear.Hands); } catch (e) { }
        try { this.waist = this.EvaluateGear(result.Character.GearSet.Gear.Waist); } catch (e) { }
        try { this.legs = this.EvaluateGear(result.Character.GearSet.Gear.Legs); } catch (e) { }
        try { this.feet = this.EvaluateGear(result.Character.GearSet.Gear.Feet); } catch (e) { }
        try { this.offhand = this.EvaluateGear(result.Character.GearSet.Gear.OffHand); } catch (e) { }
        try { this.earrings = this.EvaluateGear(result.Character.GearSet.Gear.Earrings); } catch (e) { }
        try { this.necklace = this.EvaluateGear(result.Character.GearSet.Gear.Necklace); } catch (e) { }
        try { this.bracelets = this.EvaluateGear(result.Character.GearSet.Gear.Bracelets); } catch (e) { }
        try { this.ring1 = this.EvaluateGear(result.Character.GearSet.Gear.Ring1); } catch (e) { }
        try { this.ring2 = this.EvaluateGear(result.Character.GearSet.Gear.Ring2); } catch (e) { }
        try { this.soulcrystal = this.EvaluateGear(result.Character.GearSet.Gear.SoulCrystal); } catch (e) { }

        try {
          this.freecompanyname = result.FreeCompany.Name;
          this.freecompanyslogan = result.FreeCompany.Slogan;
        } catch (e) { }

    }

    EvaluateGear(gear) {
        return gear;
    }
    delay(ms: number) {
        new Promise(resolve =>
                        setTimeout(() => resolve(), ms)).then(() =>
                        console.log('launch'));
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
      this.http.get<any[]>('https://xivapi.com/character/' + this.characterid + '?data=fc&extended=1')
      .subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(this.http, result);
        // console.log(this.characterprofile);
      }, error => console.error(error));
    }
    constructor(public http: HttpClient, private dialog: MatDialog) {    }

    openDialog(sitem) {
      this.dialog.open(TooltipComponent, {
         data: { item: sitem }}
       );
    }
}
