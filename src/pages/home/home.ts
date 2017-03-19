import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppGlobal } from '../../app/app.global';

import { DetailPage } from '../detail/detail';

import { Picture } from '../../models/picture';
import { Article } from '../../models/article';
import { PictureService } from '../../services/picture.service';
import { ArticleService } from '../../providers/article-service';


//import * as AV from 'leancloud-jssdk';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    page: number = 1;
    size: number = AppGlobal.getInstance().pageSize;

    pictures: Picture[];
    articles: Article[];

    constructor(
        public navCtrl: NavController,
        private pictureService: PictureService,
        private articleService: ArticleService
    ) { }

    ngOnInit(): void {
        //this.getPictures();
        this.getArticles();
    }

    getArticles(): void {
        this.articleService.getArticles(this.page, this.size).then(articles => {
            this.articles = articles["list"] as Article[];
        });
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
        this.page = 1;

        this.articleService.getArticles(this.page, this.size)
            .then(articles => {
                this.articles = articles["list"] as Article[];
                refresher.complete();
            });

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
