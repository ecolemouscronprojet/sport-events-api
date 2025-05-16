import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}


    async save(user: User): Promise<User> {
        return this.userRepository.save(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({email})
    }

    async emailAlreadyUsed(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user != null
    }
}
