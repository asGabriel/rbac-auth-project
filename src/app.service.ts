import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { helper } from './helper/bcrypt-helper';
import { PrismaService } from './helper/prisma.service';
import { NewUserDto } from './dto/new-user.dto';
import { PayloadDto } from './dto/payload.dto';


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
      return {access_token: token}
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async verifyToken(bearerToken: string): Promise<PayloadDto> {
    try {
        const token = bearerToken.replace('Bearer ', '');
        const verifiedToken = await this.jwtService.verify(token, {secret: "anySecret"});

        const payload: PayloadDto = {
            ID: verifiedToken.id,
            EMAIL: verifiedToken.email,
            ROLE: verifiedToken.role
        }

        return payload;
    } catch (error) {
        throw new UnauthorizedException("verifyToken",error.message);
    }
}

  async createAnyContent(data: {CONTENT: string}, decodedToken: object) {

  }


}
