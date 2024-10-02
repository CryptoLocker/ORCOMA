import { IsInt, IsString, Length, Max, Min} from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('numeric', { precision: 10, scale: 0, unique: true })
    @IsInt()
    @Min(1000000000)
    @Max(9999999999)
    docId: number;

    //@BeforeInsert()
    //@BeforeUpdate()
}