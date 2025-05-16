import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) { }


    async save(user: User): Promise<User> {
        return this.userRepository.save(user)
    }


    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string, includePassword?: boolean): Promise<User | null> {
        if (!includePassword) {
            return this.userRepository.findOneBy({ email })
        }

        return this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email: email })
            .getOne();
    }

    async emailAlreadyUsed(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user != null
    }
}
