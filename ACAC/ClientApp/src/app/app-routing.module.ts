import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EdenSavage1Component } from './who-can-lot/who-can-lot.component';
import { EdenSavage2Component } from './who-can-lot/who-can-lot.component';
import { EdenSavage3Component } from './who-can-lot/who-can-lot.component';
import { EdenSavage4Component } from './who-can-lot/who-can-lot.component';
import { HadesCarmineComponent } from './raiders/raider.component';
import { LaKiComponent } from './raiders/raider.component';
import { LanMantearComponent } from './raiders/raider.component';
import { ShellyDuncanComponent } from './raiders/raider.component';
import { ThomasSilverstarComponent } from './raiders/raider.component';
import { ValPhoenixComponent } from './raiders/raider.component';
import { YumiRinComponent } from './raiders/raider.component';
import { AerilynElessedilComponent } from './raiders/raider.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { AddItemDropComponent } from './add-item-drop/add-item-drop.component';
import { ArchivedItemDropComponent } from './admin-pages/archived-item-drop/archived-item-drop.component';
import { ManageListsComponent } from './admin-pages/manage-lists.component';
import { ProfilePicturesComponent } from './admin-pages/profile-pictures/profile-pictures.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'who-can-lot/eden-savage-1', component: EdenSavage1Component },
  { path: 'who-can-lot/eden-savage-2', component: EdenSavage2Component },
  { path: 'who-can-lot/eden-savage-3', component: EdenSavage3Component },
  { path: 'who-can-lot/eden-savage-4', component: EdenSavage4Component },
  { path: 'raiders/yumi-rin', component: YumiRinComponent },
  { path: 'raiders/lan-mantear', component: LanMantearComponent },
  { path: 'raiders/thomas-silverstar', component: ThomasSilverstarComponent },
  { path: 'raiders/hades-carmine', component: HadesCarmineComponent },
  { path: 'raiders/shelly-duncan', component: ShellyDuncanComponent },
  { path: 'raiders/val-phoenix', component: ValPhoenixComponent },
  { path: 'raiders/aerilyn-elessedil', component: AerilynElessedilComponent },
  { path: 'raiders/la-ki', component: LaKiComponent },
  { path: 'item-drop-history', component: ItemDropHistoryComponent },
  { path: 'add-item-drop', component: AddItemDropComponent },
  { path: 'admin-pages/manage-lists', component: ManageListsComponent },
  { path: 'admin-pages/archived-item-drop/archived-item-drop', component: ArchivedItemDropComponent },
  { path: 'admin-pages/profile-pictures/profile-pictures', component: ProfilePicturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
