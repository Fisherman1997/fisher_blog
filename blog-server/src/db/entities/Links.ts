import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class Links {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '名称'
    })
    name: string

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '头像'
    })
    avatar: string

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '链接'
    })
    http_url: string

    @Column({
        type: 'varchar',
        nullable: true,
        comment: '简介'
    })
    description: string

    @Column({
        type: 'int',
        nullable: false,
        comment: '状态：1 = 启用，2 = 关闭'
    })
    status: number
}