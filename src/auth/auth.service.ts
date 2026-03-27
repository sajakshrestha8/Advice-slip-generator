import bcrypt from 'bcryptjs';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.userRepo.findOne({
        where: { email: signUpDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      const user = this.userRepo.create({
        ...signUpDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepo.save(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepo.findOne({
        where: { email: loginDto.email },
      });

      const payload = { sub: user?.id, userName: user?.firstName };

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = await this.jwtService.signAsync(payload);
      // TODO: generate JWT token
      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to login');
    }
  }
}
