import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { EventModule } from './event/event.module';
import { EventPlannerModule } from './event-planner/event-planner.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { EventPlanner } from './event-planner/event-planner.entity';
import { Portfolio } from './portfolio/portfolio.entity';
import { Session } from './session/session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'aura_creations',
      entities:[EventPlanner, Portfolio, Event,Session],
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Only for development; disable in production
    }), 
    UserModule,
    SessionModule,
    PortfolioModule,
    EventPlannerModule,
    EventModule
  ]
})
export class AppModule {}
