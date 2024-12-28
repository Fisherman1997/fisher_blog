import {Comment} from "../../../../db/entities/Comment";

export class CommentRsutl extends Comment {
    childList?: Array<Comment>;
    constructor(comment: Comment, childList: Array<Comment> = []) {
        super();
        Object.assign(this, comment);
        this.childList = childList;
    }
}