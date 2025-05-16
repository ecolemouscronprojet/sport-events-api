import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { User } from 'src/database/models/user.entity';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        const emailAlreadyUsed = await this.userService.emailAlreadyUsed(createUserDto.email)
        
        if(emailAlreadyUsed){
            throw new BadRequestException('Email already used', {
                cause: new Error(),
                description: 'This email is already used by another user',
              });
        }
        const user = plainToInstance(User, createUserDto)

      return this.userService.save(user);
    }
}
