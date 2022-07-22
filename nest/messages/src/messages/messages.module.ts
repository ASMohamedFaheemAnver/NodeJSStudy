import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
  providers: [],
})
export class MessagesModule {}
