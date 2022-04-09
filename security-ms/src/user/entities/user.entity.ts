import { classToPlain, Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    @Exclude()
    salt: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeInsert()
    async hashPassword() {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}