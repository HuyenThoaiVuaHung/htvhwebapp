import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-ve-dich-question-bar',
  templateUrl: './ve-dich-question-bar.component.html',
  styleUrls: ['./ve-dich-question-bar.component.scss']
})
export class VeDichQuestionBarComponent implements OnInit {
  checkboxes : boolean[] = [];
  ifPickerActive : boolean = true;
  constructor(
    private gameService: GameServiceService
  ) { }

  ngOnInit(): void {
    this.gameService.getChecboxes().subscribe(data => {
      this.checkboxes = data.difficultyChooser;
      this.ifPickerActive = data.ifPickerActive;
    })
  }
  


}
