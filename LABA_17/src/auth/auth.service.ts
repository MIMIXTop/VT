import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async registerUser(username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userService.createUser(username, email, hashedPassword);
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
        let localHash = await bcrypt.hash(password, 10);
        if (user && user.passwordHash === localHash) {
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;        
    }
}
