import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('mySlider') slides: Slides;

  constructor(public navCtrl: NavController) {
  }

  mySlideOptions = {
    loop: true,
    pager:true,
    paginationType:'fraction'
  };

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
}
