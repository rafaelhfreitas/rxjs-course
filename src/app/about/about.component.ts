import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, merge, noop, Observable, of, timer } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      //basic example with cancel an observable
      // const interval1$ = interval(1000);
      // const sub = interval1$.subscribe(console.log);
      // setTimeout( () => sub.unsubscribe(), 5000)

      
      const http$ = createHttpObservable('/api/courses');
      const sub = http$.subscribe(console.log);

      setTimeout( () => sub.unsubscribe(), 0);

  }

}
