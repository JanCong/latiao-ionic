import { state } from './state.enum';

export class Article {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    hashId: string;
    device: number;
    commentCount: number;
    likeCount: number;
    hateCount: number;
    type: number;
    status: state;
    ip: string;
    createTime: Date;
    updateTime: Date;
    images: Array<any>;
}