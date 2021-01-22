import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseVariables } from './auth/constants';
import { User } from './users/entities/user.entity';
import { Customer } from './shared/entities/customers/customer.entity';
import { Monitor } from './shared/entities/monitors/monitor.entity';
import { SoftwareVersion } from './shared/entities/softwareVersions/software-version.entity';
import { MonitorVersion } from './shared/entities/monitorVersions/monitor-version.entity';
import { Role } from './shared/entities/roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: databaseVariables.username,
      password: databaseVariables.password,
      database: 'monitorManager',
      timezone: 'local',
      entities: [
        User,
        Customer,
        Monitor,
        SoftwareVersion,
        MonitorVersion,
        Role,
      ],
      synchronize: true, // TODO passer en 'false' lors de la mise en production
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
