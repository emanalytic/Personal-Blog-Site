import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateAdmin(email: string, password: string): Promise<boolean> {
    if (email !== process.env.ADMIN_EMAIL) return false;
    return bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const isValid = await this.validateAdmin(email, password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { role: 'admin', email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

