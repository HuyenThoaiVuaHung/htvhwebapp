import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { KhoiDongStreamClientComponent } from './khoi-dong-stream-client/khoi-dong-stream-client.component';
import { VeDichStreamClientComponent } from './ve-dich-stream-client/ve-dich-stream-client.component';
import { KhoiDongAdminComponent } from './khoi-dong-admin/khoi-dong-admin.component';
import { VeDichAdminComponent } from './ve-dich-admin/ve-dich-admin.component';
import { MaterialModule } from './material-module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayerFormAddComponent } from './player-form-add/player-form-add.component';
import { VeDichQuestionBarComponent } from './ve-dich-question-bar/ve-dich-question-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { QuestionAddFormComponent } from './question-add-form/question-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreDisplayComponent,
    KhoiDongStreamClientComponent,
    VeDichStreamClientComponent,
    KhoiDongAdminComponent,
    VeDichAdminComponent,
    PlayerFormComponent,
    PlayerFormAddComponent,
    VeDichQuestionBarComponent,
    PageNotFoundComponent,
    HomeComponent,
    QuestionAddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
