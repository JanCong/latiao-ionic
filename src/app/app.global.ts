import {User} from '../models/user';

/**
 * AppGlobal 全局定义 单例模式
 */
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();

    /**是否是调试状态 */
    isDebug: boolean = false;
    server: string = this.isDebug ? "http://localhost" : "http://latiao.izanpin.com";

    apiUrl: string = "/api";

    /**当前用户信息 */
    currentUser: User = new User();
    /**分页页数 */
    pageSize: number = 10;

    constructor() {
        if (AppGlobal.instance) {
            throw new Error("错误: 请使用AppGlobal.getInstance() 代替使用new.");
        }
        AppGlobal.instance = this;
    }

    /**
     * 获取当前实例
     * 
     * @static
     * @returns {AppGlobal}
     */
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }
}