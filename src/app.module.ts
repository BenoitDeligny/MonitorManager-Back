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
import { CustomersController } from './shared/entities/customers/customers.controller';
import { CustomersService } from './shared/entities/customers/customers.service';
import { RolesController } from './shared/entities/roles/roles.controller';
import { RolesService } from './shared/entities/roles/roles.service';
import { MonitorVersionsService } from './shared/entities/monitorVersions/monitor-versions.service';
import { SoftwareVersionsController } from './shared/entities/softwareVersions/software-versions.controller';
import { SoftwareVersionsService } from './shared/entities/softwareVersions/software-versions.service';
import { MonitorsController } from './shared/entities/monitors/monitors.controller';
import { MonitorsService } from './shared/entities/monitors/monitors.service';
import { MonitorVersionsController } from './shared/entities/monitorVersions/monitor-versions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Monitor,
      Role,
      SoftwareVersion,
      MonitorVersion,
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: databaseVariables.username,
      password: databaseVariables.password,
      database: 'monitorManager',
      timezone: 'local',
      //logging: true,
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
  controllers: [
    AppController,
    CustomersController,
    RolesController,
    MonitorsController,
    MonitorVersionsController,
    SoftwareVersionsController,
  ],
  providers: [
    AppService,
    CustomersService,
    RolesService,
    MonitorsService,
    MonitorVersionsService,
    SoftwareVersionsService,
  ],
  exports: [RolesService],
})
export class AppModule {}
