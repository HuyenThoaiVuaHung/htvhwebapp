import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlayer } from '../services/models/user.model';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : IPlayer
  ) { }

  onNoClick() : void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
