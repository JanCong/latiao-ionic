import { state } from './state.enum';

export class User {
    id: string;
    nickname: string;
    phone: string;
    email: string;
    password: string;
    sex: number;
    avatar: string;
    type: number;
    status: state;
    createTime: Date;
    updateTime: Date;
}