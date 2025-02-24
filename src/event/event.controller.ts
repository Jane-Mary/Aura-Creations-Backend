import { Controller, Get, Post, Body, Param,  Put,Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from './event.entity';
  
  @Controller('events')
  export class EventController {
    constructor(private readonly eventService: EventService) {}
  
    @Post('create')
    async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
      return this.eventService.create(createEventDto);
    }
  
    @Get()
    async findAll(): Promise<Event[]> {
      return this.eventService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Event> {
      return this.eventService.findOne(+id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateEventDto: UpdateEventDto,
    ): Promise<Event> {
      return this.eventService.update(+id, updateEventDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.eventService.remove(+id);
    }
  
    @Get('user/:userId')
    async findAllByUser(@Param('userId') userId: string): Promise<Event[]> {
      return this.eventService.findAllByUser(+userId);
    }
  
    @Get('planner/:eventPlannerId')
    async findAllByEventPlanner(
      @Param('eventPlannerId') eventPlannerId: string,
    ): Promise<Event[]> {
      return this.eventService.findAllByEventPlanner(+eventPlannerId);
    }
    
  }
