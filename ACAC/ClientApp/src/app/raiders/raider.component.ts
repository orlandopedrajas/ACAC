import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

export class ItemData {
  itemname: string;
  itemid: string;
  itemdata: any;
  itemicon: string;
}
export interface TooltipData {
  itemname: string;
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
    SavageItems: any[];
    freecompanyname: string;
    freecompanyslogan: string;

    constructor() {    }
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

        http.get<any[]>(baseUrl + 'api/ACAC/GetRaidItems?XRaider=' + this.name).subscribe(result1 => {
          this.SavageItems = result1;
        }, error => console.error(error));
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
    selector: 'app-lan-mantear',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})

export class LanMantearComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(public http: HttpClient, public dialog: MatDialog) {
    http.get<any[]>('https://xivapi.com/character/9401374?data=fc').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }

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

@Component({
    selector: 'app-aerilyn-elessedil',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})
export class AerilynElessedilComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(private http: HttpClient, public dialog: MatDialog) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/4477459?data=fc').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }

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

@Component({
    selector: 'app-hades-carmine',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
  })

  export class HadesCarmineComponent {
    displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
    characterprofile = new Charprofile();

    constructor(private http: HttpClient, public dialog: MatDialog) {
    const baseUrl = document.getElementsByTagName('base')[0].href;
    http.get<any[]>('https://xivapi.com/character/10525190?data=fc').subscribe(newObj => {
        const result: any = newObj;
        this.characterprofile.getRaider(http, result);
      }, error => console.error(error));
    }
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

@Component({
  selector: 'app-la-ki',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class LaKiComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient, public dialog: MatDialog) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/24166474?data=fc').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
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

@Component({
  selector: 'app-shelly-duncan',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ShellyDuncanComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient, public dialog: MatDialog) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/17298413?data=fc').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
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

@Component({
  selector: 'app-thomas-silverstar',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ThomasSilverstarComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient, public dialog: MatDialog) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/9199289?data=fc').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
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

@Component({
  selector: 'app-val-phoenix',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ValPhoenixComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient, public dialog: MatDialog) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/7346455?data=fc').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
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
@Component({
  selector: 'app-yumi-rin',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})
export class YumiRinComponent {
  displayedColumns: string[] = ['dateReceived', 'floor', 'raider', 'droptype'];
  characterprofile = new Charprofile();

  constructor(private http: HttpClient, public dialog: MatDialog) {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  http.get<any[]>('https://xivapi.com/character/9400141?data=fc').subscribe(newObj => {
      const result: any = newObj;
      this.characterprofile.getRaider(http, result);
    }, error => console.error(error));
  }
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

