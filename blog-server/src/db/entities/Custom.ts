import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class Custom {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '文章标题'
    }) // 文章ID
    name: string;

    @Column({
        type: 'text',
        nullable: false,
        comment: '内容'
    }) // 内容
    content: string;

    @Column({
        type: 'int',
        nullable: false,
        comment: '点击数'
    }) //点击数
    clicks: number;
    
    @Column({
        type: 'datetime',
        nullable: false,
        comment: '创建时间'
    }) // 创建时间
    createDate: Date;
}