import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [TasksModule, PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
