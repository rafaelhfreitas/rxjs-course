import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const subject = new BehaviorSubject(0);
        //const subject = new Subject();

        const series$ = subject.asObservable();

        series$.subscribe(value => console.log("early sub: ", value));
        
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();

        setTimeout( () => {
            series$.subscribe(value => console.log("late sub: ", value));
            subject.next(4);
        }, 3000);

    }


}






