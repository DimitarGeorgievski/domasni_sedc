import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './education/education.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    JobsModule,
    EducationModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
