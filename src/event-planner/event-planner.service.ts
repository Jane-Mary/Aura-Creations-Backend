import * as bcrypt from 'bcrypt'
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EventPlanner } from './event-planner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlannerDto } from 'src/dto/create-eventplanner.dto';

@Injectable()
export class EventPlannerService {
constructor(
    @InjectRepository(EventPlanner)
    private eventPlannerRepository: Repository<EventPlanner>
){}

async create(createPlannerDto: CreatePlannerDto): Promise<EventPlanner> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createPlannerDto.password, salt);

    const planner = this.eventPlannerRepository.create({
      ...createPlannerDto,
      password: hashedPassword,
    });

    return this.eventPlannerRepository.save(planner);
  }

  // ✅ Secure Planner Login
  async login(email: string, password: string): Promise<EventPlanner> {
    const planner = await this.eventPlannerRepository.findOne({
      where: { email },
    });

    if (!planner) {
      throw new NotFoundException('Planner not found');
    }

    const isPasswordValid = await bcrypt.compare(password, planner.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return planner;
  }

    
//Get all planners
async findAll() : Promise<EventPlanner[]>{
    return this.eventPlannerRepository.find({ relations :['portfolios', 'events', 'sessions']});
}

//Get a single planner
async findOne(id:number) : Promise<EventPlanner>{
    const eventPlanner = await this.eventPlannerRepository.findOne({
        where: {id},
        relations : ['portfolios', 'events', 'sessions']
    })
    if(!eventPlanner) {
        throw new NotFoundException(`EventPlanner with id ${id} not found`)
    }
    return eventPlanner;
}

// Update an EventPlanner by ID
async update(id: number, eventPlannerData: Partial<EventPlanner>): Promise<EventPlanner | null> {
   const eventPlanner = await this.findOne(id);
    Object.assign(eventPlanner,eventPlannerData)
    return this.eventPlannerRepository.save(eventPlanner);
}

//Delete a planner 
async remove( id:number ): Promise<void>{
    const eventPlanner = await this.findOne(id)
    await this.eventPlannerRepository.remove(eventPlanner)
}

}
