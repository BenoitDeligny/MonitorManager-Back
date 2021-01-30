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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
    MailerModule.forRoot({
      transport: 'smtps://delignyb.pro@gmail.com:Itsnotme92@smtp.gmail.com', // ! Changer lors de la mise en prod
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
    JwtModule.register({}),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
  exports: [RolesService],
})
export class AppModule {}
