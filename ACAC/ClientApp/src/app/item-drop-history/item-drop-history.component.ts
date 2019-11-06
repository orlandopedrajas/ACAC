import { Component } from '@angular/core';

@Component({
  selector: 'app-item-drop-history',
  templateUrl: './item-drop-history.component.html',
  styleUrls: ['./item-drop-history.component.css']
})

export class ItemDropHistoryComponent { 

  savageFloor = 'ALL';

  tabChanged(t) {
    switch (t.index) {
      case 0: {
        this.savageFloor = 'ALL';
        break;
      }
      case 1: {
        this.savageFloor = 'Eden Savage Floor 1';
        break;
      }
      case 2: {
        this.savageFloor = 'Eden Savage Floor 2';
        break;
      }
      case 3: {
        this.savageFloor = 'Eden Savage Floor 3';
        break;
      }
      case 4: {
        this.savageFloor = 'Eden Savage Floor 4';
        break;
      }
    }


  }
}
