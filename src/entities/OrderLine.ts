import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany} from "typeorm"
import { Category } from "./Category";
import { Order } from "./Order";
import { Product } from "./Product"

@Entity('orderLine')//to save it in the database in this case left empty cuz we won't be saving it there , not needed
export class OrderLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    quantity: number;
    
    @ManyToOne(
        () => Order,
        order => order.orderline    
    )
    @JoinColumn()
    order: Order;

    @ManyToOne(
        () => Product,
         product => product.orderline
    )
    @JoinColumn()
    product:Product;

    

    
}