import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatTabNav } from '@angular/material/tabs';
import { delay } from 'rxjs/operators';
import { GameServiceService } from '../services/game-service.service';
import { IQuestion } from '../services/models/question.model';
import { IPlayer } from '../services/models/user.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-ve-dich-stream-client',
  templateUrl: './ve-dich-stream-client.component.html',
  styleUrls: ['./ve-dich-stream-client.component.scss']
})
export class VeDichStreamClientComponent implements OnInit {
  state: string = 'not-auth';
  matchID: string = '';
  currentTime: number = 0;
  timerMode: ProgressBarMode = 'indeterminate';
  currentinterval: number = 0;
  currentQuestion: string = '';
  constructor(
    private gameService: GameServiceService,
    private questionService: QuestionService
  ) { }
  players: IPlayer[] = [];
  selectedPlayer: number = 0;
  ngOnInit(): void {

  }
  login(){
    this.gameService.getAllPlayers(this.matchID).subscribe(_players => {
      this.players = _players;
    });
    this.gameService.getVeDichDetails().subscribe(async match => {
      this.selectedPlayer = match.turn;
      this.currentinterval = match.curInterval;
      //pls timer system ⏲️⏲️⏲️👁️👄👁️
      if(match.ifPause == true && this.currentTime >= 0){
        this.gameService._pauseTimer(this.currentTime);
        console.log("Timer is now paused");
        this.timerMode = 'indeterminate'
        this.currentTime = 0;
      }
      else if(match.ifStart == true && this.currentTime <= 0 && match.ifPause == false && match.ifReset == false){
        this.currentTime = 100;
        console.log("Timer is now started");
        this.doTimer();
        this.timerMode = 'determinate'
        this.gameService._triggerTimer();
      }
      else if(match.ifStart == true && this.currentTime > 0 && match.ifPause == false && match.ifReset == false){
        console.log("Timer is already started");
        this.timerMode = 'determinate'
        this.gameService._triggerTimer();
      }
      else if(match.ifPause == true && this.currentTime <= 0){
        this.currentTime = await this.gameService._unpauseTimer();
        this.timerMode = 'determinate'
        console.log("Timer is now unPaused");
        this.doTimer();
      }
      else if (match.ifReset == true && this.currentTime >= 0){
        this.currentTime = 0;
        console.log("Timer is now resetted");
        this.gameService._disableResetPauseTimer();
        this.timerMode = 'indeterminate'
      }
      else if (match.ifReset == true && this.currentTime <= 0){
        this.currentTime = await this.gameService._unpauseResetPauseTimer();
        console.log("Timer is now continued");
        this.timerMode = 'determinate'
        this.doTimer();
      }
      await this.questionService.getQuestion(match.curPool, match.curQuesID).then(res => {
        this.currentQuestion = res.question;
      });
    });
    
    this.state = 'auth';
  }
  private doTimer(){
    let intervalId = setInterval(() => {
      if(this.currentTime < 0) clearInterval(intervalId)
      this.currentTime = this.currentTime - 1;
  }, this.currentinterval);
  }

}
