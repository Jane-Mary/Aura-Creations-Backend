import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventPlannerService } from './event-planner.service';
import { EventPlanner } from './event-planner.entity';
import { CreatePlannerDto } from 'src/dto/create-eventplanner.dto';

@Controller('event-planners')
export class EventPlannerController {
constructor(private readonly eventPlannerService: EventPlannerService) {}

//Create a new planner
@Post('create')
async create(@Body() createPlannerDto:CreatePlannerDto): Promise<EventPlanner> {
    return this.eventPlannerService.create(createPlannerDto)
}

//User Login
@Post('login')
async login(@Body(){email,password}:{email:string; password:string}) {
    return this.eventPlannerService.login(email,password);
}
   

//Get all planners
@Get()
async findAll() : Promise<EventPlanner[]> {
    return this.eventPlannerService.findAll()
}

//Get a planner
@Get(':id')
async findOne(@Param('id') id:string ) : Promise<EventPlanner> {
    return this.eventPlannerService.findOne(+id)
}

//Update a Planner 
@Put(':id')
async update(
    @Param('id') id: string,
    @Body() eventPlannerData:Partial<EventPlanner>
) : Promise<EventPlanner | null> {
    return this.eventPlannerService.update(+id, eventPlannerData)
}

//Delete a planner
@Delete(':id')
async remove(@Param('id') id: string) : Promise<void> {
return this.eventPlannerService.remove(+id)
}

}
