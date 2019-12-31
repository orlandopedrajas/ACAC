import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { WhoCanLotComponent } from './who-can-lot/who-can-lot.component';

import { RaiderComponent } from './raiders/raider.component';

import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { ArchivedItemDropComponent } from './admin-pages/archived-item-drop/archived-item-drop.component';
import { NineComponent } from './nine/nine.component';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { AlternateJobsComponent } from './alternate-jobs/alternate-jobs.component';
import { AttendanceComponent } from './admin-pages/attendance/attendance.component';
import { RaidFloorComponent } from './admin-pages/raid-floors/raid-floors.component';
import { RaiderManagementComponent } from './admin-pages/raider-management/raider-management.component';
import { AddRaidItemDropComponent } from './admin-pages/add-raiditem-drop/add-raiditem-drop.component';
import { ManageRoundrobinListsComponent } from './admin-pages/manage-roundrobin-lists/manage-roundrobin-lists.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'who-can-lot', component: WhoCanLotComponent },
  { path: 'raiders/:raidername', component: RaiderComponent },
  { path: 'raiders', component: RaiderComponent },
  { path: 'authorize', component: AuthorizeComponent },
  { path: 'item-drop-history', component: ItemDropHistoryComponent },
  { path: 'admin-pages/archived-item-drop/archived-item-drop', component: ArchivedItemDropComponent },
  { path: 'nine/nine', component: NineComponent },
  { path: 'weapon-alternates', component: AlternateJobsComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'admin-pages/raid-floors/raid-floors', component: RaidFloorComponent },
  { path: 'admin-pages/raider-management/raider-management', component: RaiderManagementComponent },
  { path: 'admin-pages/add-raiditem-drop/add-raiditem-drop', component: AddRaidItemDropComponent },
  { path: 'admin-pages/manage-roundrobin-lists/manage-roundrobin-lists', component: ManageRoundrobinListsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
