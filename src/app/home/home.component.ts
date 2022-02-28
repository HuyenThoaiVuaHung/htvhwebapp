import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }
  wait :boolean = true;
  async ngOnInit()  {
    await delay(2000);
    this.wait = false;
  }

}
