import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent, ValidateUserComponent } from './nav-menu/nav-menu.component';


import { DemoMaterialModule } from './material-module';
import { EdenSavage1Component, EdenSavage2Component,
         EdenSavage3Component, EdenSavage4Component } from './who-can-lot/who-can-lot.component';

import { AerilynElessedilComponent, HadesCarmineComponent,
         LaKiComponent, LanMantearComponent,
         ShellyDuncanComponent, ThomasSilverstarComponent,
         ValPhoenixComponent, YumiRinComponent } from './raiders/raider.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { AddItemDropComponent } from './add-item-drop/add-item-drop.component';
import { ArchivedItemDropComponent } from './admin-pages/archived-item-drop/archived-item-drop.component';
import { ManageListsComponent } from './admin-pages/manage-lists.component';
import { ProfilePicturesComponent } from './admin-pages/profile-pictures/profile-pictures.component';
import { CookieService } from 'ngx-cookie-service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { ItemDropComponent } from './components/item-drop/item-drop.component';
import { RoundRobinListComponent } from './components/round-robin-list/round-robin-list.component';
import { ItemDropByFloorComponent } from './components/item-drop-by-floor/item-drop-by-floor.component';
import { NineComponent } from './nine/nine.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    EdenSavage1Component,
    EdenSavage2Component,
    EdenSavage3Component,
    EdenSavage4Component,
    AerilynElessedilComponent,
    HadesCarmineComponent,
    LaKiComponent,
    LanMantearComponent,
    ShellyDuncanComponent,
    ThomasSilverstarComponent,
    ValPhoenixComponent,
    YumiRinComponent,
    ItemDropHistoryComponent,
    AddItemDropComponent,
    ArchivedItemDropComponent,
    ManageListsComponent,
    ProfilePicturesComponent,
    ValidateUserComponent,
    TooltipComponent,
    CharacterInfoComponent,
    ItemDropComponent,
    RoundRobinListComponent,
    ItemDropByFloorComponent,
    NineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatNativeDateModule,
    DemoMaterialModule
  ],
  providers: [ CookieService ],
  entryComponents: [ValidateUserComponent, TooltipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
