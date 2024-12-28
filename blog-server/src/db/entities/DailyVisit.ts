import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class DailyVisit {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 500,
        comment: '链接路径'
    })
    Path: string;

    @Column({
        type: 'datetime',
        comment: '访问日期（只保存日期部分）'
    })
    VisitDate: Date

    @Column({
        type: 'int',
        comment: '访问次数'
    })
    VisitCount: number;
    
}