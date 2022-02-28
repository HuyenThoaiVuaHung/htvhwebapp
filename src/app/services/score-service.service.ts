import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';
import { IPlayer } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  constructor(private afs: AngularFirestore) { }
  
  public async increasePoint(amount: number, playerID: number, matchID: string){
    const docRef: any = await this.afs.doc('player-data-' + matchID+ '/' + playerID).valueChanges().pipe(first()).toPromise();
    let payload : IPlayer = {
      name: docRef.name,
      class: docRef.class,
      points: docRef.points + amount
    }
    this.afs.doc('player-data-' + matchID+ '/' + playerID).update(payload);
  }
  public async decreasePoint(amount: number, playerID: number, matchID: string){
    const docRef: any = await this.afs.doc('player-data-' + matchID+ '/' + playerID).valueChanges().pipe(first()).toPromise();
    let payload : IPlayer = {
      name: docRef.name,
      class: docRef.class,
      points: docRef.points - amount
    }
    this.afs.doc('player-data-' + matchID+ '/' + playerID).update(payload);
  }
  public async resetPoints(playerID: number, matchID: string){
    const docRef: any = await this.afs.doc('player-data-' + matchID+ '/' + playerID).valueChanges().pipe(first()).toPromise();
    let payload: IPlayer = {
      name: docRef.name,
      class: docRef.class,
      points: 0
    }
    this.afs.doc('player-data-' + matchID+ '/' + playerID).update(payload);
  }
  public async updatePointsTo(amount: number, playerID: number, matchID: string){
    const docRef: any = await this.afs.doc('player-data-' + matchID+ '/' + playerID).valueChanges().pipe(first()).toPromise();
    let payload: IPlayer = {
      name: docRef.name,
      class: docRef.class,
      points: amount
    }
    this.afs.doc('player-data-' + matchID+ '/' + playerID).update(payload);
  }

}
