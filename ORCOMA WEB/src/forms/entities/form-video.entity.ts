import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';


@Entity()
export class FormVideo {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    url: string

    @OneToOne(
        () => Form,
        ( form ) => form.video,
        {  onDelete: 'CASCADE' }
    )
    form: Form

}