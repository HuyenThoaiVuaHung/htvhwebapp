import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IQuestion } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private afs: AngularFirestore) { }
  public getVeDichPool(poolID: string): Observable<any[]>{
    return this.afs.collection('vedich-pool-' + poolID).valueChanges({idField: 'propertyId'});
  }
  public getVeDichCollection(poolID: string): AngularFirestoreCollection {
    return this.afs.collection('vedich-pool' + '/' + poolID);
  }
  public async getQuestion(poolID: string, questionID: number): Promise<any>{
    let result = await this.afs.collection('vedich-pool-' + poolID, query => query.where('randId', '==', questionID)).valueChanges().pipe(first()).toPromise();
    return await result[0];
  }
  public selectQuestion(poolID: string, questionID: number) {
    this.afs.doc('match-data/veDich').update({
      curPool: poolID,
      curQuesID: questionID
    });
    console.log('updated to display ' + poolID + '/' + questionID);
  }
  public clearQuestionFromDisplay(){
    this.afs.doc('match-data/veDich').update({
      curPool: 'none',
      curQuesID: 0
    });
    console.log('cleared questions');
  }
  public async addQuestion(question: IQuestion, pool: string){
    let randId: number = this.randomNumber(1,999999);
    console.log(randId);
    question.randId = randId;
    console.log(question);
    this.afs.collection('vedich-pool-'+ pool).add(question);

  }
  private randomNumber(min: number, max: number): number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public updateQuestion(payload: IQuestion, pool: string, propertyId: string){
    this.afs.doc('vedich-pool-'+ pool + '/' + propertyId).update(payload);
  }
  public removeQuestion(propertyId: string, pool: string){
    this.afs.doc('vedich-pool-' + pool + '/' + propertyId).delete();
  }
}
