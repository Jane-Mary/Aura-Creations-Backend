import { Injectable, NotFoundException } from '@nestjs/common';
import { EventPlanner } from './event-planner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventPlannerService {
constructor(
    @InjectRepository(EventPlanner)
    private eventPlannerRepository: Repository<EventPlanner>
){}

//Create a new event planner
async create(eventPlannerData: Partial<EventPlanner>): Promise<EventPlanner> {
const eventPlanner = this.eventPlannerRepository.create(eventPlannerData)
return this.eventPlannerRepository.save(eventPlanner)
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
