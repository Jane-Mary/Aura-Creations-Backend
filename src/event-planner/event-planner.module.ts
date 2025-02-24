import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventPlanner } from './event-planner.entity';
import { EventPlannerService } from './event-planner.service';
import { EventPlannerController } from './event-planner.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EventPlanner])],
    providers : [EventPlannerService],
    controllers : [EventPlannerController]
})
export class EventPlannerModule {}
