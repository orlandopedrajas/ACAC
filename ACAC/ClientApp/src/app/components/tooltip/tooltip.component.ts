import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TooltipData {
itemname: string;
itemicon: string;
}

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: TooltipData) { }
}
