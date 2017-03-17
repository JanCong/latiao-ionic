import { state } from './state.enum';

export class Picture {
    id: string;
    text: string;
    author: string;
    images: Array<any>;
    likes: number;
    commentCount: number;
    state: state;
    createdAt: Date;
    updatedAt: Date;
}