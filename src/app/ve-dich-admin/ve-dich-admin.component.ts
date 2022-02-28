import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatRow } from '@angular/material/table/row';
import { tap } from 'rxjs/operators';
import { PlayerFormAddComponent } from '../player-form-add/player-form-add.component';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { QuestionAddFormComponent } from '../question-add-form/question-add-form.component';
import { GameServiceService } from '../services/game-service.service';
import { IQuestion } from '../services/models/question.model';

import { IPlayer } from '../services/models/user.model';
import { QuestionService } from '../services/question.service';
import { ScoreServiceService } from '../services/score-service.service';

@Component({
  selector: 'app-ve-dich-admin',
  templateUrl: './ve-dich-admin.component.html',
  styleUrls: ['./ve-dich-admin.component.scss']
})
export class VeDichAdminComponent implements OnInit {
  selectedRow: any = [];
  displayedColumnsPlayers: string[] = ['id', 'name', 'class', 'points'];
  displayedColumnsQuestions: string[] = ['question', 'answer', 'points'];
  selectedQuestionRow: any = [];
  state: string = 'not-auth';
  adminPassword: string = '';
  players: IPlayer[] = [];
  matchID: string = '';
  questions: IQuestion[] = [];
  __questions: IQuestion[] = [];
  ifPause: boolean = false;
  ifReset: boolean = false;
  ifStart: boolean = false
  pauseTime: number = 0;
  resetTime: number = 0;
  maxTime: number = 20;
  checkboxes: boolean[] = []; 
  questionData: any = [];
  constructor(
    private scoreService: ScoreServiceService,
    private gameService: GameServiceService,
    private questionService: QuestionService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.checkboxes = await this.gameService.getBar();
  }
  login(){
    if (this.adminPassword == 'htvhiv!2021'){
      this.state = 'auth';
    }
    if (this.state == 'auth'){
      this.gameService.getAllPlayers(this.matchID).subscribe(_players => {
        this.players = _players
      })
      this.gameService.getVeDichDetails().subscribe(_details => {
        this.ifPause = _details.ifPause,
        this.ifReset = _details.ifReset,
        this.ifStart = _details.ifStart,
        this.pauseTime = _details.pauseTime,
        this.resetTime = _details.resetTime
      });
      this.questionService.getVeDichPool(this.matchID).subscribe(_questions => {
        this.questions = _questions;
        this.questionData = new MatTableDataSource(_questions);
      })


      
    }
    
    
  }
  onPlayerRowClicked(row: MatRow){
    this.selectedRow = row;
    this.gameService.changeTurnVeDich(+this.selectedRow.propertyId);
  }
  onPlayerDoubleClick(row: any){
    // Canswer,Cquestion, CchoiceA, CchoiceB, CchoiceC, CchoiceD : string = '';
    let curPlayer : IPlayer = {name: row.name, class: row.class, points: row.points};
    const dialogRef = this.dialog.open(PlayerFormComponent, {data: curPlayer})
    let passedResult: IPlayer;
    dialogRef.afterClosed().subscribe(
      result => {
        passedResult = result;
        if (passedResult != undefined) this.gameService.updatePlayer(row.propertyId, passedResult, this.matchID);
      }
    )
  }
  onQuestionRowClicked(row: MatRow){
    this.selectedQuestionRow = row;
    this.questionService.selectQuestion(this.matchID, +this.selectedQuestionRow.randId);
  }  
  onQuestionDoubleClick(row: any){
    let curQues : IQuestion = {randId: row.randId, question: row.question, answer: row.answer, points: row.points};
    const dialogRef = this.dialog.open(QuestionAddFormComponent, {data: curQues})
    let passedResult: IQuestion;
    dialogRef.afterClosed().subscribe(
      result => {
        passedResult = result;
        if (passedResult != undefined) this.questionService.updateQuestion(passedResult, this.matchID, this.selectedQuestionRow.propertyId)
      }
    )
  }
  searchVal: string = '';
  checkSearchVal() {
    let searchQuestion: IQuestion[] = [];
    this.questionService.getVeDichPool(this.matchID).pipe(
      tap(questions => {
        searchQuestion = questions;
      })
    )
    let filteredUsers: IQuestion[] = [];
    if (this.searchVal && this.searchVal != '') {
      for (let selectedQuestion of searchQuestion) {
        if (selectedQuestion.question.toLowerCase().search(this.searchVal.toLowerCase()) != -1 ||
          selectedQuestion.question.toLowerCase().search(this.searchVal.toLowerCase()) != -1) {
          filteredUsers.push(selectedQuestion);
        }
      }

      this.questions = filteredUsers.slice();
    }
  }

  addNewPlayer(){
    let _PID, _name, _class : string = ''; 
    let points: number = 0;
    const dialogRef = this.dialog.open(PlayerFormAddComponent,{
      data: {PID: _PID, name: _name, class: _class, points: points}
    });
    //const dialogRef = this.dialog.open(NewQuesttionFormComponent);
    let passedResult: any;
    let playerPayload: IPlayer;
    dialogRef.afterClosed().subscribe(result=> {
      passedResult = result;
      playerPayload = {name: passedResult.name, class: passedResult.class, points: passedResult.points}
      if (passedResult != undefined) this.gameService.createNewPlayer(passedResult.propertyId, playerPayload, this.matchID);

    });
  }
  addNewQuestion(){
    const dialogRef = this.dialog.open(QuestionAddFormComponent,{
      data: {}
    });
    dialogRef.afterClosed().subscribe(result=> {
      if (result != undefined) {
        let questionPayload: IQuestion = {randId: 0 ,question: result.question, answer: result.answer, points: result.points}
        this.questionService.addQuestion(questionPayload, this.matchID);
    }
    });
  }
  removeQuestion(){
    this.questionService.removeQuestion(this.selectedQuestionRow.propertyId, this.matchID); 
  }
  incr(amnt: number){
    this.scoreService.increasePoint(amnt, this.selectedRow.propertyId, this.matchID)
  }
  decr(amnt: number){
    this.scoreService.decreasePoint(amnt, this.selectedRow.propertyId, this.matchID)
  }
  pauseTimer(){
    this.gameService._triggerPauseTimer();
  }
  resetTimer(){
    this.gameService._resetPauseTimer(this.resetTime);
  }
  startTimer(){
    this.gameService._triggerTimer();
  }
  updateInterval(){
    this.gameService.updateInterval(this.maxTime * 10);
    this.gameService._resetPauseTimer(100);
  }
  //Difficulty chooser-bar
  toggle(number: number){
    console.log(number);
    this.gameService.toggleNumber(number);
    this.checkboxes[number] = true; 
  }
  resetBar(){
    this.gameService.resetCheckboxes();
    this.checkboxes = [false, false, false, false, false, false, false, false, false];
  }
}
