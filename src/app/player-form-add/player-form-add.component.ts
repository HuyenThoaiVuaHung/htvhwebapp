import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-form-add',
  templateUrl: './player-form-add.component.html',
  styleUrls: ['./player-form-add.component.scss']
})
export class PlayerFormAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlayerFormAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  onNoClick() : void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
