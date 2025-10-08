import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TasksModule],
  controllers: [PrismaService],
  providers: [PrismaService],
})
export class AppModule {}
