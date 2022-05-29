import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm"
import { Product } from "./Product"
import { OrderLine } from "./OrderLine";

@Entity('category')//to save it in the database in this case left empty cuz we won't be saving it there , not needed
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    
    

}