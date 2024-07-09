import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    //browser callback api
    //user interactions with async events combined streams

    document.addEventListener('click', event => {
      console.log(event);

      setTimeout(() =>{

        console.log("finished");
        
        let counter = 0;

        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);

      }, 3000);
    });







  }

}
