import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
){}

// ✅ Create User with Encrypted Password
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  // ✅ User Login with Password Validation
  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid password');
    }

    return user;
  }

//Find all users
async findAll() : Promise<User[]> {
    return this.usersRepository.find()
}

//Find one user by id
async findOne(id: number) : Promise<User> {
    const user = await this.usersRepository.findOne({ where: {id}});
    if (!user) {
        throw new NotFoundException(`User with Id ${id} not found`)
    }
    return user
}

//Update user 
async update(id:number, updateUserDto: UpdateUserDto) : Promise<User> {
    const user = await this.findOne(id);
    Object.assign( user, updateUserDto);
    return this.usersRepository.save(user);
}

//Delete user by id
async remove(id:number) : Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
}

}
