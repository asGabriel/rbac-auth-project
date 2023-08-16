import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { helper } from './helper/bcrypt-helper';
import { PrismaService } from './helper/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService, 
    private readonly jwtService: JwtService
    ) { }

  async userLogin(data: UserLoginDto, recurso: string) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          EMAIL: data.EMAIL
        }
      })

      if(!await helper.hashCompare(data.PASSWORD, user)) throw new UnauthorizedException("Wrong password.");

      const payload = {
        id: user.CODUSER,
        email: user.EMAIL,
        role: user.ROLE
      }
      
      const token = await this.jwtService.signAsync(payload, {secret: "anySecret", expiresIn: '1h'})
      return token
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async verifyToken(bearerToken: string): Promise<Object> {
    try {
        const token = bearerToken.replace('Bearer ', '');
        const verifiedToken = await this.jwtService.verify(token);

        const payload = {
            id: verifiedToken.id,
            email: verifiedToken.email,
            role: verifiedToken.role
        }

        return payload;
    } catch (error) {
        throw new UnauthorizedException(error.message);
    }
}

  async createAnyContent(data: {CONTENT: string}, decodedToken: object) {

  }
}
