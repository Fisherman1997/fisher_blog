import {ArticleList} from "../../../../db/entities/ArticleList";

export class ArticleFindResult {
    id: number;
    cover: string[];
    title: string
    content: string
    classId: number;
    createDate: Date;
    updateTime?: Date;
    clicks: number;
    createUserId: number;

    constructor(entity: ArticleList, isContent: boolean = true) {

        Object.assign(this, entity);
        // 如果不需要 Content 则设置为 null
        if (!isContent) {
            this.content = null;
        }
        // 处理 Cover 字段，转换为数组
        this.cover = entity.cover ? JSON.parse(entity.cover) as string[] : [];
    }
}