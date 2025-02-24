import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserService {
constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
){}

//Create user
async create(createUserDto : CreateUserDto) : Promise<User>{
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user)
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
