import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from "typeorm"
import { OrderLine } from "./OrderLine";

@Entity('order')//to save it in the database in this case left empty cuz we won't be saving it there , not needed
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({
        unique: true,
    })
    mobile:string;

    @Column()
    address:string

    @Column()
    city:string;

    @Column()
    totalPrice: number

    @OneToMany(
        () => OrderLine,
        orderline => orderline.order
    )
    orderline: OrderLine[];

    @Column({default:false})
    completed: boolean;

    @CreateDateColumn()
    created_at:Date;
}