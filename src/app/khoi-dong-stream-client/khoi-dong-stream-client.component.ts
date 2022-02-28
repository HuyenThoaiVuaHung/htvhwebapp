import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatTabNav } from '@angular/material/tabs';
import { delay } from 'rxjs/operators';
import { GameServiceService } from '../services/game-service.service';
import { IPlayer } from '../services/models/user.model';

@Component({
  selector: 'app-khoi-dong-stream-client',
  templateUrl: './khoi-dong-stream-client.component.html',
  styleUrls: ['./khoi-dong-stream-client.component.scss']
})
export class KhoiDongStreamClientComponent implements OnInit {
  state: string = 'not-auth';
  matchID: string = '';
  currentTime: number = 0;
  timerMode: ProgressBarMode = 'indeterminate';
  constructor(
    private gameService: GameServiceService,
    
  ) { }
  players: IPlayer[] = [];
  selectedPlayer: number = 0;
  ngOnInit(): void {

  }
  login(){
    this.gameService.getAllPlayers(this.matchID).subscribe(_players => {
      this.players = _players;
    });
    this.gameService.getKhoiDongDetails().subscribe(async match => {
      this.selectedPlayer = match.turn;
      //pls timer system ⏲️⏲️⏲️👁️👄👁️
      if(match.ifPause == true && this.currentTime >= 0){
        this.gameService.pauseTimer(this.currentTime);
        console.log("Timer is now paused");
        this.timerMode = 'indeterminate'
        this.currentTime = 0;
      }
      else if(match.ifStart == true && this.currentTime <= 0 && match.ifPause == false && match.ifReset == false){
        this.currentTime = 100;
        console.log("Timer is now started");
        this.doTimer();
        this.timerMode = 'determinate'
        this.gameService.triggerTimer();
      }
      else if(match.ifStart == true && this.currentTime > 0 && match.ifPause == false && match.ifReset == false){
        console.log("Timer is already started");
        this.timerMode = 'determinate'
        this.gameService.triggerTimer();
      }
      else if(match.ifPause == true && this.currentTime <= 0){
        this.currentTime = await this.gameService.unpauseTimer();
        this.timerMode = 'determinate'
        console.log("Timer is now unPaused");
        this.doTimer();
      }
      else if (match.ifReset == true && this.currentTime >= 0){
        this.currentTime = 0;
        console.log("Timer is now resetted");
        this.gameService.disableResetPauseTimer();
        this.timerMode = 'indeterminate'
      }
      else if (match.ifReset == true && this.currentTime <= 0){
        this.currentTime = await this.gameService.unpauseResetPauseTimer();
        console.log("Timer is now continued");
        this.timerMode = 'determinate'
        this.doTimer();
      }
    });

    this.state = 'auth';
  }
      //start work on timer 6:06PM/27/09/2021
  private doTimer(){
    let intervalId = setInterval(() => {
      if(this.currentTime < 0) clearInterval(intervalId)
      this.currentTime = this.currentTime - 1;
  }, 600);
  }

}
