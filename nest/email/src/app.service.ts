import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import transportConfig from './config';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}
  async mail() {
    try {
      await this.mailerService.sendMail({
        from: transportConfig.from,
        to: 'faheem065@gmail.com',
        subject: 'UDEV',
        text: 'CODE',
      });
    } catch (e) {
      console.log({ e });
    }
    return true;
  }
}
