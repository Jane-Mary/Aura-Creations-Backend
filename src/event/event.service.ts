import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { UpdateEventDto } from 'src/dto/update-event.dto';
import { User } from '../User/user.entity';
import { EventPlanner } from '../event-planner/event-planner.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(EventPlanner)
    private eventPlannersRepository: Repository<EventPlanner>,
  ) {}

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { userId, eventPlannerId, ...eventData } = createEventDto;

    // Find the user and event planner
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const eventPlanner = await this.eventPlannersRepository.findOne({
      where: { id: eventPlannerId },
    });
    if (!eventPlanner) {
      throw new NotFoundException(`Event Planner with ID ${eventPlannerId} not found`);
    }

    // Create the event
    const event = this.eventsRepository.create({
      ...eventData,
      user,
      eventPlanner,
    });

    return this.eventsRepository.save(event);
  }

  // Get all events
  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['user', 'eventPlanner'] });
  }

  // Get a specific event by ID
  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['user', 'eventPlanner'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  // Update an event
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id); // Reuse findOne to check if event exists
    Object.assign(event, updateEventDto); // Update event properties
    return this.eventsRepository.save(event);
  }

  // Delete an event
  async remove(id: number): Promise<void> {
    const event = await this.findOne(id); // Reuse findOne to check if event exists
    await this.eventsRepository.remove(event);
  }

  // Get all events for a specific user
  async findAllByUser(userId: number): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'eventPlanner'],
    });
  }

  // Get all events for a specific event planner
  async findAllByEventPlanner(eventPlannerId: number): Promise<Event[]> {
    return this.eventsRepository.find({
      where: { eventPlanner: { id: eventPlannerId } },
      relations: ['user', 'eventPlanner'],
    });
  }
}
