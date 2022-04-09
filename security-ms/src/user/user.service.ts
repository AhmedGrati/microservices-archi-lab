import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterInput } from "src/auth/dto/register.input";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findOneByEmail(email: string) {
        return this.userRepository.findOne({where: {email}});
    }

    async create(registerInput: RegisterInput) {
    // check if the user is unique or not
        let checkUser = await this.userRepository.findOne({
        where: [
        {email: registerInput.email},
        ],
        });
        if (!checkUser) {
            const user = await this.userRepository.create(registerInput);
            return await this.userRepository.save(user);
        } else {
        // if the user has the same username or email with someone else we throw an exception
            throw new HttpException(
            'The User Already Exists',
            HttpStatus.BAD_REQUEST,
      );
    }
    }

}