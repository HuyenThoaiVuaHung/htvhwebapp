import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { IPlayer } from '../services/models/user.model';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent implements OnInit {
  state: string = 'not-auth'
  constructor(private gameService: GameServiceService) { }
  score: number = 0;
  name: string = ""
  PID: number = 0;
  curPlayer : IPlayer = {
    name: '',
    class: '',
    points: 0
  };
  matchID: string = "";
  ngOnInit(): void {
  }
  login(){
    this.gameService.getPlayer(this.PID, this.matchID).subscribe(player =>{
      this.curPlayer = player;
    });
    this.state = 'auth'
  }

}
