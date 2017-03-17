import { Injectable } from '@angular/core';

import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
    constructor() { }

    addComment(pictureId: string, comment: Comment): Promise<void> {
        return new Promise<void>(resolve => {
            var obj = new AV.Object('Comment');
            obj.set('text', comment.text);
            obj.set('author', comment.author);
            obj.set('avatar', comment.avatar);
            obj.set('images', comment.images);
            obj.set('likes', 0);

            var picture = AV.Object.createWithoutData('Picture', pictureId);
            obj.set('picture', picture);

            obj.save().then(() => {
                picture.increment('commentCount', 1);
                picture.fetchWhenSave(true);
                return picture.save();
            }).then(() => {
                resolve();
            }, this.handleError);
        });
    }

    getComments(pictureId: string): Promise<Comment[]> {
        return new Promise<Comment[]>(resolve => {
            var query = new AV.Query('Comment');
            var picture = AV.Object.createWithoutData('Picture', pictureId);
            query.equalTo('picture', picture);
            query.descending('createdAt');
            query.find().then(results => {
                var comments: Comment[] = new Array<Comment>();
                results.forEach(result => {
                    var comment = new Comment();
                    comment.id = result.id;
                    comment.text = result.get('text');
                    comment.author = result.get('author');
                    comment.avatar = result.get('avatar');
                    comment.images = result.get('images');
                    comment.likes = result.get('likes');
                    comment.createdAt = result.createdAt;
                    comment.updatedAt = result.updatedAt;
                    comments.push(comment);
                });
                resolve(comments);
            }, this.handleError);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}