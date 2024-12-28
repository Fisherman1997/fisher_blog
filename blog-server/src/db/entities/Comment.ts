import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class Comment {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '文章ID'
    }) // 文章ID
    articleId: string

    @Column({
        type: 'int',
        nullable: true,
        comment: '父级ID'
    }) // 父级ID
    parentId: number

    @Column({
        type: 'varchar',
        nullable: true,
        comment: '回复名称'
    }) // 回复名称
    replyName: string

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
        comment: '内容'
    }) // 内容
    content: string
    
    @Column({
        type: 'datetime',
        nullable: false,
        comment: '创建时间'
    }) // 创建时间
    createDate: Date;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '评论人'
    }) // 评论人
    reviewerName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '账号'
    }) // 评论人
    qq: string;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: '网址'
    }) // 网址
    httpsrc: string;
}