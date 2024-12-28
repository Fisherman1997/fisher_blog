import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class ArticleList {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '封面图片url'
    }) // 封面
    cover: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        comment: '标题'
    }) //标题
    title: string
    
    @Column({
        type: 'text',
        default: () => null,
        nullable: true,
        comment: '内容'
    }) // 内容
    content: string
    
    @Column({
        type: 'int',
        nullable: false,
        comment: '分类Id'
    }) //点击数
    classId: number;
    
    @Column({
        type: 'datetime',
        nullable: false,
        comment: '创建时间'
    }) // 创建时间
    createDate: Date;
    
    @Column({
        type: 'datetime',
        default: () => null,
        nullable: true,
        comment: '修改时间'
    }) //修改时间
    updateTime: Date;

    @Column({
        type: 'int',
        default: () => 0,
        nullable: false,
        comment: '点击数'
    }) //点击数
    clicks: number;
    

    
    @Column({
        type: 'int',
        nullable: false,
        comment: '创建人Id'
    }) //点击数
    createUserId: number;
}