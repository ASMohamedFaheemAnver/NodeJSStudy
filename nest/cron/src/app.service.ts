import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createUser(body: CreateUserDto) {
    this.logger.log({ body });
    const userId = Math.random().toString();
    this.eventEmitter.emit(
      'user:created',
      new UserCreatedEvent(userId, body.email),
    );
    const establishWSTimeout = setTimeout(() => {
      this.logger.log({ msg: 'WS CONNECTED!' });
    }, 5000);
    this.schedulerRegistry.addTimeout(userId, establishWSTimeout); // In memory stored, If running multiple instance. We need some other ways
    return body;
  }

  @OnEvent('user:created')
  welcomeMailCreatedUser(payload: UserCreatedEvent) {
    this.logger.log({ event: this.welcomeMailCreatedUser.name, payload });
  }

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'DELETE_EXPIRED_USERS' })
  deleteExpiredUsers() {
    this.logger.log({
      cron: this.deleteExpiredUsers.name,
      msg: 'DELETING EXPIRED USERS!',
    });
  }
}
