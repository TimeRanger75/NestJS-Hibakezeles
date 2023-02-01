/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import RegisterDTO from './register.dto';
import User from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Post('/register')
  async register(@Body()registerdto:RegisterDTO){
    if (!registerdto.email || !registerdto.password || !registerdto.passwordagain) {
      throw new BadRequestException("All fields are required")
    }
    if(!registerdto.email.includes('@')){
      throw new BadRequestException('Email must contain a @ character')
    }
    if (registerdto.password!==registerdto.passwordagain) {
      throw new BadRequestException("The two passwor must match")
    }
    if (registerdto.password.length<8) {
      throw new BadRequestException('The password must be at least 8 characters long')
    }

    const userRepo=this.dataSource.getRepository(User);
    const user=new User();
    user.email=registerdto.email;
    user.password=await bcrypt.hash(registerdto.password,15);
    await userRepo.save(user);
    delete user.password;
    return user;
  }

  

}
