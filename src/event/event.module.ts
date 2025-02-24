import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { User } from '../User/user.entity';
import { UserModule } from '../User/user.module'
import { EventPlanner } from '../event-planner/event-planner.entity';
import { EventPlannerModule } from 'src/event-planner/event-planner.module';

@Module({
    imports: [ TypeOrmModule.forFeature([Event,User,EventPlanner]),
     UserModule,//Links users to events
     EventPlannerModule //;inks the event-planner to that event
    ],
    providers: [EventService],
    controllers: [EventController]
})
export class EventModule {}
