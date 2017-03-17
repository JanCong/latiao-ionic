import { Injectable } from '@angular/core';
import { ImagePicker } from 'ionic-native';

import { Picture } from '../models/picture';
import { state } from '../models/state.enum';

@Injectable()
export class PictureService {
    constructor() { }

    getPictures(): Promise<Picture[]> {
        return new Promise<Picture[]>(resolve => {
            var query = new AV.Query('Picture');
            query.descending('createdAt');
            query.find().then(results => {
                var pictures: Picture[] = new Array<Picture>();
                results.forEach(result => {
                    pictures.push({
                        id: result.id,
                        text: result.get('text'),
                        author: result.get('author'),
                        images: result.get('images'),
                        likes: result.get('likes'),
                        state: result.get('state'),
                        commentCount: result.get('commentCount'),
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt
                    })
                });
                resolve(pictures);
            }, this.handleError);
        });
    }

    getPicture(id: string): Promise<Picture> {
        return new Promise<Picture>(resolve => {
            var query = new AV.Query('Picture');
            query.include('comments');
            query.get(id).then(result => {
                var picture: Picture = new Picture()
                picture.id = result.id;
                picture.text = result.get('text');
                picture.author = result.get('author');
                picture.images = result.get('images');
                picture.likes = result.get('likes');
                picture.commentCount = result.get('commentCount');
                picture.createdAt = result.createdAt;
                picture.updatedAt = result.updatedAt

                resolve(picture);
            }, this.handleError);
        });
    }

    uploadPictures(): Promise<void> {
        return new Promise<void>(resolve => {
            ImagePicker.getPictures({
                maximumImagesCount: 8
            }).then((results) => {
                var files = [];
                var length = results.length;
                for (var i = 0; i < results.length; i++) {
                    var arrPath = results[i].split('.');
                    var fileName = 'image.' + arrPath[arrPath.length - 1];

                    (<any>window).plugins.Base64.encodeFile(results[i]
                        , (base64) => {
                            var file = new AV.File(fileName, { base64: base64 });
                            files.push(file);
                            length--;
                            var Picture = AV.Object.extend('Picture');
                            var picture = new Picture();
                            picture.set('author', 'admin');
                            picture.set('images', file);
                            picture.set('state', state.Disabled);
                            picture.save();

                            // if (length === 0) {
                            //     alert(files.length);
                            //     var Picture = AV.Object.extend('Picture');
                            //     var picture = new Picture();
                            //     picture.set('author', 'admin');
                            //     picture.set('images', files);
                            //     picture.set('state', state.Disabled);
                            //     picture.save().then(() => {
                            //         resolve();
                            //     }, this.handleError);
                            // }
                        });
                }
            }, this.handleError);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        var Log = AV.Object.extend('Picture');
        var log = new Log();
        log.set('content', error);
        log.set('type', 'error');
        log.save()
        return Promise.reject(error.message || error);
    }
}