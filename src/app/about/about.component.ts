import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // interval rxjs
    // Creates an Observable that emits sequential numbers every specified interval of time, on a specified SchedulerLike.
    // const interval$ = interval(1000);
    // interval$.subscribe(value => console.log("stream 1  " + value));
    // interval$.subscribe(value => console.log("stream 2  " + value));


    // timer rxjs
    const timer$ = timer(3000, 1000 );
    timer$.subscribe(value => console.log("stream 1 " + value));

    const click$ = fromEvent(document, 'click');

    click$.subscribe(event => console.log(event));



  }

}
