import {GetChinese} from "../../../../common/commonly.fun";

export class ArticleListResult {
    id: number
    content: string
    coverList: string[]
    title: string
    createDate: Date
    clicks?: number
    createUserName: string
    className: string
    portrait: string[]
    constructor(Article: any) {
        Object.assign(this, Article)
        this.coverList = JSON.parse(Article.cover_list)
        this.portrait = JSON.parse(Article.portrait)
        if (Article.className) this.content = GetChinese(Article.content)
    }
}