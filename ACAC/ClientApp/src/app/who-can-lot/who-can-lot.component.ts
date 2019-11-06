import { Component } from '@angular/core';

@Component({
  selector: 'app-who-can-lot',
  templateUrl: './who-can-lot.component.html',
  styleUrls: ['./who-can-lot.component.css'],

})
export class WhoCanLotComponent {

    savageFloor = 'Eden Savage Floor 1';
    constructor() { }

    tabChanged(t) {
      switch (t.index) {
        case 0: {
          this.savageFloor = 'Eden Savage Floor 1';
          break;
        }
        case 1: {
          this.savageFloor = 'Eden Savage Floor 2';
          break;
        }
        case 2: {
          this.savageFloor = 'Eden Savage Floor 3';
          break;
        }
        case 3: {
          this.savageFloor = 'Eden Savage Floor 4';
          break;
        }
      }


    }
}

