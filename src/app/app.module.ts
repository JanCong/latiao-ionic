import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { KeyboardAttachDirective } from '../directives/keyboard-attach.directive';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';

import { PictureService } from '../services/picture.service';
import { CommentService } from '../services/comment.service';

@NgModule({
  declarations: [
    KeyboardAttachDirective,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    TabsPage
  ],
  providers: [PictureService, CommentService]
})
export class AppModule { }
