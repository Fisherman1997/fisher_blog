import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity()
export class Classification {
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
        comment: '名称'
    })
    name: string;
}