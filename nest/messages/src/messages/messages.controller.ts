import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Controller('messages')
export class MessagesController {
  private messages: { id: string; message: string }[] = [];

  @Get('/')
  getMessages(): { id: string; message: string }[] {
    return this.messages;
  }

  @Post()
  createMessage(@Body('message') message): { id: string; message: string } {
    if (!message) {
      return null;
    }
    console.log({ message });
    const messageObject = { id: randomUUID(), message };
    this.messages.push(messageObject);
    return messageObject;
  }

  @Get('/:id')
  getMessage(@Param('id') id) {
    return (
      this.messages.find((message) => message.id == id) || { msg: 'not found' }
    );
  }
}
