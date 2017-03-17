import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

import { Picture } from '../../models/picture';
import { Comment } from '../../models/comment';
import { PictureService } from '../../services/picture.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'page-details',
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {
  picture: Picture;
  comment: Comment;
  commentText: string;
  comments: Comment[];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private pictureService: PictureService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.picture = this.navParams.get('selectedPicture');
    this.getPicture(this.picture.id);
    this.getComments(this.picture.id);
    Keyboard.disableScroll(true);
  }

  addComment(): void {
    this.comment = new Comment();
    this.comment.author = '路人甲';
    this.comment.text = this.commentText;
    this.commentText = '';
    this.commentService.addComment(this.picture.id, this.comment)
      .then(() => {
        this.getComments(this.picture.id);
        this.getPicture(this.picture.id);
      });
  }

  getPicture(id): void {
    this.pictureService.getPicture(id).then(picture => {
      this.picture = picture;
    });
  }

  getComments(pictureId: string): void {
    this.commentService.getComments(pictureId).then(comments => {
      this.comments = comments;
    });
  }
}
