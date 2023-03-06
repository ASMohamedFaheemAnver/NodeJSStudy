import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import transportConfig from './config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        auth: transportConfig.auth,
        host: transportConfig.host,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
