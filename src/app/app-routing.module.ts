import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KhoiDongAdminComponent } from './khoi-dong-admin/khoi-dong-admin.component';
import { KhoiDongStreamClientComponent } from './khoi-dong-stream-client/khoi-dong-stream-client.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { VeDichAdminComponent } from './ve-dich-admin/ve-dich-admin.component';
import { VeDichQuestionBarComponent } from './ve-dich-question-bar/ve-dich-question-bar.component';
import { VeDichStreamClientComponent } from './ve-dich-stream-client/ve-dich-stream-client.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'kd-admin', component: KhoiDongAdminComponent},
  { path: 'kd-sc', component: KhoiDongStreamClientComponent },
  { path: 'diem-so', component: ScoreDisplayComponent },
  { path: 'vd-admin', component: VeDichAdminComponent },
  { path: 'vd-sc-question-timer', component: VeDichStreamClientComponent },
  { path: 'vd-sc-question-bar', component: VeDichQuestionBarComponent },
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
