import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UserController {
constructor (private readonly userService:UserService) {}

//Create a new user
@Post('create') 
async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    return this.userService.create(createUserDto);
}

 // User Login
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<User> {
    const { email, password } = body;
    return this.userService.login(email, password);
  }
    

//Get all users
@Get()
async findAll() : Promise<User[]> {
    return this.userService.findAll()
}

//Get one user
@Get(':id')
async findOne(@Param('id') id:string ) : Promise<User> {
    return this.userService.findOne(+id)
}

//Update a user
@Put(':id')
async update(
    @Param('id') id:string ,
    @Body() updateUserDto: UpdateUserDto
) : Promise<User> {
    return this.userService.update(+id, updateUserDto)
}

//Delete a user
@Delete(':id')
async remove(@Param('id') id:string) : Promise<void> {
    return this.userService.remove(+id)
}

}
