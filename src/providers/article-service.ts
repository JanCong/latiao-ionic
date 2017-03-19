import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppGlobal } from '../app/app.global';

import { Article } from '../models/article';

/*
  Generated class for the ArticleService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ArticleService {

  constructor(private http: Http) {
  }

  getArticles(page: number, size: number, sinceId?: string, maxId?: string): Promise<{}> {
    return new Promise(resolve => {
      let params = new URLSearchParams();
      params.set('sinceId', sinceId);
      params.set('maxId', maxId);

      this.http.get(AppGlobal.getInstance().server + AppGlobal.getInstance().apiUrl + '/article/timeline/1/20', {
        search: params
      }).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },
        this.handleError,
        () => console.log('done')
        )
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
