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
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


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

        this.courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`) as Observable<Course>;

        
    }
    
    ngAfterViewInit() {

        const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            )

        const initialLessons$ = this.loadLessons();
            
        this.lessons$ = concat(initialLessons$, searchLessons$);
    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(
                `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`,)
                .pipe(
                    map(res => res["payload"])
                )
    }


}
