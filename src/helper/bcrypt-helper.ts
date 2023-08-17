import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

class HashHelper {
    async hashCompare(PASSWORD: string, USER: User): Promise<boolean> {
        try {
            const hash = await bcrypt.compare(PASSWORD, USER.PASSWORD);
            if (!hash) throw new UnauthorizedException("Wrong password.")
            return hash
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async hashPassword(PASSWORD: string): Promise<string> {
        try {
            const hash = await bcrypt.hash(PASSWORD, 10);
            return hash
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}

export const helper = new HashHelper();