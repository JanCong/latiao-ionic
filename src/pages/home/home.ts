import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { Picture } from '../../models/picture';
import { PictureService } from '../../services/picture.service';


//import * as AV from 'leancloud-jssdk';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    pictures: Picture[];
    test: Picture[];

    constructor(
        public navCtrl: NavController,
        private pictureService: PictureService
    ) { }

    ngOnInit(): void {
        this.getPictures();
    }

    getPictures(): void {
        this.pictureService.getPictures()
            .then(pictures => {
                this.pictures = pictures;
            });
    }

    gotoDetailPage(selectedPicture): void {
        this.navCtrl.push(DetailPage, { selectedPicture });
    }

    doRefresh(refresher): void {
        this.pictureService.getPictures()
            .then(pictures => {
                this.pictures = pictures;
                refresher.complete();
            });
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }

    uploadPictures(): void {
        this.pictureService.uploadPictures();
    }
}
