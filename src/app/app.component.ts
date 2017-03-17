import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

//import * as AV from 'leancloud-jssdk';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  //rootPage = HomePage;

  constructor(platform: Platform) {
    AV.init({
      appId: 'oMwq9Lv2rlcCq2yxfhsaNW93-gzGzoHsz',
      appKey: 'wSjhc5ise3VdM1YiP27078OH',
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
