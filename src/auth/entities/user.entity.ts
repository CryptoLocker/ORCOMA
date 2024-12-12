import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {

    @ApiProperty({
        description: "User's UUID",
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    email: string

    @ApiProperty({
        description: 'Password of the user (not returned in responses)',
        example: 'hashedPassword123'
    })
    @Column('text', {
        select: false
    })
    password: string

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe'
    })
    @Column('text')
    fullName: string

    @ApiProperty({
        description: 'Whether the user account is active',
        example: true,
        default: true
    })
    @Column('bool', {
        default: true,
    })
    isActive: boolean

    @ApiProperty({
        description: 'User roles',
        example: ['user', 'admin'],
        default: ['user'],
        isArray: true
    })
    @Column('text', {
        array: true,
        default: ['user'],
    })
    roles: string[]

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert()
    }
}
