import { BadRequestException, Injectable } from '@nestjs/common';
import { NewUserDto } from 'src/dto/new-user.dto';
import { helper } from 'src/helper/bcrypt-helper';
import { PrismaService } from 'src/helper/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async create(data: NewUserDto) {
        try {
            const hassPassword = await helper.hashPassword(data.PASSWORD)
            const user = await this.prismaService.user.create({
                data: {
                    EMAIL: data.EMAIL,
                    PASSWORD: hassPassword,
                    ROLE: data.ROLE,
                    USERNAME: data.USERNAME
                }
            })

            return user
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
