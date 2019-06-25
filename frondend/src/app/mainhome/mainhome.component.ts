import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {

  items:any;

  constructor() { }

  ngOnInit() {
    this.items = ['RIshika', 'Hariks', 'chaitu', 'ellundi', 'avthala', 'exuce', 'hello', 'ekkada'];
  }

}
