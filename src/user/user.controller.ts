import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDto } from 'src/dto/new-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async create(@Body() data: NewUserDto) {
        return await this.userService.create(data)
    }
}
