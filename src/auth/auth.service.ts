
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string}> {
    const user = await this.usersService.findByEmail(email, true);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    
    const payload = { 
        sub: user.id,
        id: user.id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
