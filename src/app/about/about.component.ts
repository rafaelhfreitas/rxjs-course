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
    //examples of callback api to generate streams of data

    document.addEventListener('click', event => {
      console.log(event);

      setTimeout(() =>{

        console.log("finished");
        
        let counter = 0;

      setTimeout(() =>{

        console.log("finished");
        
        let counter = 0;

        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);
        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);

      }, 3000);
    });






      }, 3000);
    });







  }

}
