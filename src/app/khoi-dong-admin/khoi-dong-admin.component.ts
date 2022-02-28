import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRow } from '@angular/material/table';
import { PlayerFormAddComponent } from '../player-form-add/player-form-add.component';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { GameServiceService } from '../services/game-service.service';
import { IPlayer } from '../services/models/user.model';
import { ScoreServiceService } from '../services/score-service.service';

@Component({
  selector: 'app-khoi-dong-admin',
  templateUrl: './khoi-dong-admin.component.html',
  styleUrls: ['./khoi-dong-admin.component.scss']
})
export class KhoiDongAdminComponent implements OnInit {
  players: IPlayer[] = [];
  
  currPlayer: IPlayer = {name: '', class: '', points: 0};
  constructor(
    private scoreService: ScoreServiceService,
    private gameService: GameServiceService,
    public dialog: MatDialog
     ) {   }
  //Player management
  //Player management
  //Player management
  //Player management
  //Player management
  //Player management
  //Player management
  selectedRow: any = [];
  displayedColumns: string[] = ['id', 'name', 'class', 'points'];
  state: string = 'not-auth';
  adminPassword: string = '';
  matchID: string = '';
  ifPause: boolean = false;
  ifReset: boolean = false;
  ifStart: boolean = false
  pauseTime: number = 0;
  resetTime: number = 0;
  ngOnInit(): void {
  }
  login(){
    if (this.adminPassword == 'htvhiv!2021'){
      this.state = 'auth';
    }
    if (this.state == 'auth'){
      this.gameService.getAllPlayers(this.matchID).subscribe(_players => {
        this.players = _players
      })
      this.gameService.getKhoiDongDetails().subscribe(_details => {
        this.ifPause = _details.ifPause,
        this.ifReset = _details.ifReset,
        this.ifStart = _details.ifStart,
        this.pauseTime = _details.pauseTime,
        this.resetTime = _details.resetTime
      });
    }
  }
  scrollTopBottom(){
    var yPosition = 1000;
    window.scrollTo(0,yPosition);
  }
  onRowClicked(row: MatRow){
    this.selectedRow = row;
    this.gameService.changeTurnKhoiDong(+this.selectedRow.propertyId);
  }
  onDoubleClick(row: any){
    // Canswer,Cquestion, CchoiceA, CchoiceB, CchoiceC, CchoiceD : string = '';
    let currQuestion : IPlayer = {name: row.name, class: row.class, points: row.points};
    const dialogRef = this.dialog.open(PlayerFormComponent, {data: currQuestion})
    let passedResult: IPlayer;
    dialogRef.afterClosed().subscribe(
      result => {
        passedResult = result;
        if (passedResult != undefined) this.gameService.updatePlayer(row.propertyId, passedResult, this.matchID);
      }
    )
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
  //Game management
  //Game management
  //Game management
  //Game management
  //Game management
  incr(amnt: number){
    this.scoreService.increasePoint(amnt, this.selectedRow.propertyId, this.matchID)
  }
  decr(amnt: number){
    this.scoreService.decreasePoint(amnt, this.selectedRow.propertyId, this.matchID)
  }
  pauseTimer(){
    this.gameService.triggerPauseTimer();
  }
  resetTimer(){
    this.gameService.resetPauseTimer(this.resetTime);
  }
  startTimer(){
    this.gameService.triggerTimer();
  }
}
