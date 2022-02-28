import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-add-form',
  templateUrl: './question-add-form.component.html',
  styleUrls: ['./question-add-form.component.scss']
})
export class QuestionAddFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuestionAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { }

  ngOnInit(): void {
  }

  onNoClick() : void {
    this.dialogRef.close();
  }
}
