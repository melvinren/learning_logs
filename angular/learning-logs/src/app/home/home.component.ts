import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Learning Log'
  subtitle = "Learning log helps you keep track of your learning, for any topic you're learning about"

  constructor() { }

  ngOnInit() {
  }

}
