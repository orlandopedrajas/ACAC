import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AddItemDropComponent } from './add-item-drop/add-item-drop.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { YumiRinComponent } from './raiders/yumi-rin/yumi-rin.component';
import { LanMantearComponent } from './raiders/lan-mantear/lan-mantear.component';
import { ThomasSilverstarComponent } from './raiders/thomas-silverstar/thomas-silverstar.component';
import { HadesCarmineComponent } from './raiders/hades-carmine/hades-carmine.component';
import { ShellyDuncanComponent } from './raiders/shelly-duncan/shelly-duncan.component';
import { ValPhoenixComponent } from './raiders/val-phoenix/val-phoenix.component';
import { AerilynElessedilComponent } from './raiders/aerilyn-elessedil/aerilyn-elessedil.component';
import { LaKiComponent } from './raiders/la-ki/la-ki.component';
import { EdenSavage1Component } from './who-can-lot/eden-savage-1/eden-savage-1.component';
import { EdenSavage2Component } from './who-can-lot/eden-savage-2/eden-savage-2.component';
import { EdenSavage3Component } from './who-can-lot/eden-savage-3/eden-savage-3.component';
import { EdenSavage4Component } from './who-can-lot/eden-savage-4/eden-savage-4.component';
import { ManageListsComponent } from './admin-pages/manage-lists.component';
import { ArchivedItemDropComponent } from './admin-pages/archived-item-drop/archived-item-drop.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddItemDropComponent,
    ItemDropHistoryComponent,
    YumiRinComponent,
    LanMantearComponent,
    ThomasSilverstarComponent,
    HadesCarmineComponent,
    ShellyDuncanComponent,
    ValPhoenixComponent,
    AerilynElessedilComponent,
    LaKiComponent,
    EdenSavage1Component,
    EdenSavage2Component,
    EdenSavage3Component,
    EdenSavage4Component,
    ManageListsComponent,
    ArchivedItemDropComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'add-item-drop', component: AddItemDropComponent },
      { path: 'item-drop-history', component: ItemDropHistoryComponent },
      { path: 'raiders/yumi-rin', component: YumiRinComponent },
      { path: 'raiders/lan-mantear', component: LanMantearComponent },
      { path: 'raiders/thomas-silverstar', component: ThomasSilverstarComponent },
      { path: 'raiders/hades-carmine', component: HadesCarmineComponent },
      { path: 'raiders/shelly-duncan', component: ShellyDuncanComponent },
      { path: 'raiders/val-phoenix', component: ValPhoenixComponent },
      { path: 'raiders/aerilyn-elessedil', component: AerilynElessedilComponent },
      { path: 'raiders/la-ki', component: LaKiComponent },
      { path: 'who-can-lot/eden-savage-1', component: EdenSavage1Component },
      { path: 'who-can-lot/eden-savage-2', component: EdenSavage2Component },
      { path: 'who-can-lot/eden-savage-3', component: EdenSavage3Component },
      { path: 'who-can-lot/eden-savage-4', component: EdenSavage4Component },
      { path: 'admin-pages/manage-lists', component: ManageListsComponent },
      { path: 'admin-pages/archived-item-drop/archived-item-drop', component: ArchivedItemDropComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
