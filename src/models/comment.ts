import { Picture } from '../models/picture';

export class Comment {
    id: string;
    picture: Picture;
    text: string;
    author: string;
    avatar: string;
    images: Array<string>;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}