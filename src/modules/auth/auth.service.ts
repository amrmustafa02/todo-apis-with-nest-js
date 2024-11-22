import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import { GlobalResponse } from '../../core/dto/global.response';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './scheme/user.scheme';
import * as bcrypt from 'bcrypt';
import { GlobalErrorHandler } from '../../core/error/global-error-handler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: any,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<GlobalResponse> {
    try {
      var user = await this.getUser(loginDto.email);

      if (user == null) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }

      var isPasswordMatch = await this.comparePassword(
        loginDto.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new HttpException(
          'Password does not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      var token = await this.generateToken({
        id: user._id,
        email: user.email,
      });

      return {
        statusCode: 200,
        message: 'success',
        data: token,
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }

  async register(registerDto: RegisterDto): Promise<GlobalResponse> {
    try {
      var user = await this.getUser(registerDto.email);

      if (user != null) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      var hashPassword = await this.hashPassword(registerDto.password);

      var newUser = new this.userModel({
        email: registerDto.email,
        password: hashPassword,
        name: registerDto.name,
      });

      var result = await newUser.save();

      return {
        statusCode: 200,
        message: 'User created successfully',
        data: result,
      };
    } catch (error) {
      GlobalErrorHandler.catch(error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    return await bcrypt.compare(oldPassword, newPassword);
  }

  private async generateToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  private async getUser(email: String): Promise<any> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      return null;
    }
  }
}
