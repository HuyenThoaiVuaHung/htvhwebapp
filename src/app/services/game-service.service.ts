import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NumberValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import {first} from 'rxjs/operators'
import { IPlayer } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  constructor(
    private afs: AngularFirestore   
  ) {
   }
  
  public getPlayer(PID: number, matchID: string): Observable<any>{
    return this.afs.doc('player-data-'+ matchID +'/' + PID).valueChanges();
  }
  public getAllPlayers(matchID: string): Observable<any[]>{
    return this.afs.collection('player-data-' + matchID).valueChanges({idField: 'propertyId'});
  }
  public createNewPlayer(PID: number, payload: IPlayer, matchID: string){
    let _PID: number = PID;
    this.afs.collection('player-data-' + matchID).doc(PID.toString()).set(payload);
  }
  public updatePlayer(PID: number, payload: IPlayer, matchID: string){
    this.afs.doc('player-data-'+ matchID +'/' + PID).update(payload);
  }

  public getKhoiDongDetails(): Observable<any>{
    return this.afs.doc('match-data/khoiDong').valueChanges();
  }
  public getVeDichDetails(): Observable<any>{
    return this.afs.doc('match-data/veDich').valueChanges();
  }
  public changeTurnKhoiDong(_turn: number){
    this.afs.doc('match-data/khoiDong').update({
      turn: _turn
    });
  }
  public changeTurnVeDich(_turn: number){
    this.afs.doc('match-data/veDich').update({
      turn: _turn
    })
  }
  public getChecboxes(): Observable<any>{
    return this.afs.doc('match-data/veDich').valueChanges();
  }
  public resetCheckboxes(){
    let resetBox = [false, false, false, false, false, false, false, false, false];
    this.afs.doc('match-data/veDich').update({
      difficultyChooser: resetBox
    })
  }
  public async toggleNumber(position: number){
    const docRef: any = await this.afs.doc('match-data/veDich').valueChanges().pipe(first()).toPromise();
    docRef.difficultyChooser[position] = !docRef.difficultyChooser[position];
    this.afs.doc('match-data/veDich').update({
      difficultyChooser: docRef.difficultyChooser
    })
  }
  // PLS TIMER SYSTEM
  // for khoiDong
  public pauseTimer(currentTime: number ){
    this.afs.doc('match-data/khoiDong').update({
      pauseTime: currentTime,
      ifPause: false
    })
  }
  public triggerPauseTimer(){
    this.afs.doc('match-data/khoiDong').update({
      ifPause: true
    })
  }
  public async unpauseTimer(): Promise<number>{
    const docRef: any = await this.afs.doc('match-data/khoiDong').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/khoiDong').update({
      pauseTime: 0,
      ifPause: false
    });
    return docRef.pauseTime
  }
  public resetPauseTimer(time: number){
    this.afs.doc('match-data/khoiDong').update({
      ifReset: true,
      resetTime: time,
    });

  }
  public disableResetPauseTimer(){
    this.afs.doc('match-data/khoiDong').update({
      ifReset: false
    })
  }
  public async unpauseResetPauseTimer(): Promise<number>{
    const docRef: any = await this.afs.doc('match-data/khoiDong').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/khoiDong').update({
      ifReset: false
    })
    return docRef.resetTime;
  }
  public async triggerTimer(){
    const docRef: any = await this.afs.doc('match-data/khoiDong').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/khoiDong').update({
      ifStart: !docRef.ifStart
    })
  }
  //for veDich
  public _pauseTimer(currentTime: number ){
    this.afs.doc('match-data/veDich').update({
      pauseTime: currentTime,
      ifPause: false
    })
  }
  public _triggerPauseTimer(){
    this.afs.doc('match-data/veDich').update({
      ifPause: true
    })
  }
  public async _unpauseTimer(): Promise<number>{
    const docRef: any = await this.afs.doc('match-data/veDich').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/veDich').update({
      pauseTime: 0,
      ifPause: false
    });
    return docRef.pauseTime
  }
  public _resetPauseTimer(time: number){
    this.afs.doc('match-data/veDich').update({
      ifReset: true,
      resetTime: time,
    });

  }
  public _disableResetPauseTimer(){
    this.afs.doc('match-data/veDich').update({
      ifReset: false
    })
  }
  public async _unpauseResetPauseTimer(): Promise<number>{
    const docRef: any = await this.afs.doc('match-data/veDich').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/veDich').update({
      ifReset: false
    })
    return docRef.resetTime;
  }
  public async _triggerTimer(){
    const docRef: any = await this.afs.doc('match-data/veDich').valueChanges().pipe(first()).toPromise();
    this.afs.doc('match-data/veDich').update({
      ifStart: !docRef.ifStart
    })
  }
  public async getBar(): Promise<boolean[]>{
    const docRef: any = await this.afs.doc('match-data/veDich').valueChanges().pipe(first()).toPromise();
    return docRef.difficultyChooser;
  }
  public updateInterval(interval: number){
    this.afs.doc('match-data/veDich').update({
      curInterval: interval
    })
  }
}

