import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
    arm = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        // if (data.itemuicategory.toLowerCase().indexOf('arm') > -1) { this.arm = true; }
        //console.log(data);
    }
}
