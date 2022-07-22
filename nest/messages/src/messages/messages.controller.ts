import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateMessageDto } from './dtos/create-message-dto';

@Controller('messages')
export class MessagesController {
  private messages: { id: string; message: string }[] = [];

  @Get('/')
  getMessages(): { id: string; message: string }[] {
    return this.messages;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto): {
    id: string;
    message: string;
  } {
    console.log({ ...body });
    const messageObject = { id: randomUUID(), ...body };
    this.messages.push(messageObject);
    return messageObject;
  }

  @Get('/:id')
  getMessage(@Param('id') id) {
    const message = this.messages.find((message) => message.id == id);
    if (!message) throw new BadRequestException(['message not found']);
    return message;
  }
}
