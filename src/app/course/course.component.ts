import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay,
    throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel, setRxJsLogginLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    courseId: string;

    @ViewChild('searchInput', { static: true, read: ElementRef }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        // this.courseId = this.route.snapshot.params['id'];

        // this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
        //         .pipe(
        //             //tap(course =>   console.log(course))
        //             debug(RxJsLoggingLevel.INFO, "course value"),
        //         ) as Observable<Course>;

        // setRxJsLogginLevel(RxJsLoggingLevel.TRACE);

        this.courseId = this.route.snapshot.params['id'];

        const course$ = createHttpObservable(`/api/courses/${this.courseId}`);
        const lessons$ = this.loadLessons();

        forkJoin(course$, lessons$)
            .pipe(
                tap(([course, lessons]) => {
                    console.log('course', course);
                    console.log('lessons', lessons);
                })
            )
            .subscribe();

        
    }
    
    ngAfterViewInit() {

        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                throttleTime(500)
            )
            .subscribe(console.log)

        // this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         map(event => event.target.value),
        //         startWith(''),
        //         debug(RxJsLoggingLevel.INFO, "seach"),
        //         debounceTime(400),
        //         distinctUntilChanged(),
        //         switchMap(search => this.loadLessons(search)),
        //         debug(RxJsLoggingLevel.INFO, "lessons value"),

        //     )
            
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(
                `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`,)
                .pipe(
                    map(res => res["payload"])
                )
    }


}
