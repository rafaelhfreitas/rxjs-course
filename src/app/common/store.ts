import {  Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, timer } from "rxjs";
import { Course } from "../model/course";
import { tap, map, shareReplay, retryWhen, delayWhen } from "rxjs/operators";
import { createHttpObservable } from "./util";

@Injectable({
    providedIn: 'root'
})
export class Store {


    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log("HTTP request executed")),
                map(res => Object.values(res["payload"]))
            )
            .subscribe(courses => 
                this.subject.next(courses)
            );

    }


    filterByCategory(category): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == category))
            );
    }


    selectBeginnerCourses(): Observable<Course[]> {
        return this.filterByCategory('BEGINNER');

    }


}