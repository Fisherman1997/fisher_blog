import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class RandomWrite {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: 'url数组，json数据'
    })
    cover_list: string;
    
    @Column({
        type: 'text',
        nullable: false,
        comment: '内容'
    })
    content: string
    
    @Column({
        type: 'datetime',
        nullable: false,
        comment: '创建时间'
    })
    createDate: Date;
    
    @Column({
        type: 'datetime',
        default: () => null,
        nullable: true,
        comment: '修改时间'
    })
    updateTime: Date;

    @Column({
        type: 'int',
        nullable: false,
        comment: '点击数'
    }) //点击数
    clicks: number;
    
    @Column({
        type: 'int',
        nullable: false,
        comment: '创建人id'
    })
    createUserId: number;
}