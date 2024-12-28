import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class RoutingConfigure {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'int',
        nullable: true,
        comment: '父级ID'
    })
    primary_id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '标题'
    })
    title: string

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '名称（不要中文）'
    })
    name: string
    
    @Column({
        type: 'varchar',
        nullable: false,
        comment: '路由路径'
    })
    path: string
        
    @Column({
        type: 'varchar',
        nullable: false,
        comment: '路由组件路径'
    })
    component: string;

    @Column({
        type: 'int',
        nullable: false,
        comment: '范围： 0-后台， 1-前台'
    })
    range: number;

    @Column({
        type: 'int',
        nullable: false,
        comment: '是否菜单： 0-否， 1-是'
    })
    menu: number;

    @Column({
        type: 'varchar',
        nullable: false,
        comment: '图标'
    })
    iconType: string;

    @Column({
        type: 'int',
        nullable: false,
        comment: '序号'
    })
    serialNumber: number;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: '重定向路径'
    })
    redirect: string;

    @Column({
        type: 'int',
        nullable: false,
        comment: '状态： 0-关闭， 1-启用'
    })
    status: number;
}