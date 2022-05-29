import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Category } from "./Category"
import { OrderLine } from "./OrderLine";

@Entity('product')//to save it in the database in this case left empty cuz we won't be saving it there , not needed
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    price:string

    @Column()
    image: string;

    @Column()
    description:string;

    @Column()
    isPopular: boolean;

    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    category: Category;

    @OneToMany(
        () => OrderLine,
        orderline => orderline.product
    )
    orderline: OrderLine[];


}