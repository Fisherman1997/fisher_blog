import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        comment: '用户姓名'
    })
    name: string;
    
    @Column({
        type: 'varchar',
        nullable: false,
        comment: '头像'
    })
    portrait: string

    @Column({
        type: 'varchar',
        length: 8,
        nullable: false,
        comment: '用户账号'
    })
    code: string
    
    @Column({
        type: 'varchar',
        nullable: false,
        comment: '用户密码'
    })
    password: string
    
    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: '用户权限'
    })
    power: string;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: '邮箱'
    }) // 邮箱
    eMail: string;

    @Column({
        type: 'int',
        nullable: false,
        comment: '状态：1-启用，2-关闭'
    })
    status: number;
    
    @Column({
        type: 'varchar',
        length: 400,
        nullable: true,
        comment: 'token'
    })
    token: string;
}