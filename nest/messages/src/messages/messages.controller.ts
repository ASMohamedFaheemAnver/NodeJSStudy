import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  private messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }

  @Get('/')
  getMessages(): Promise<{ id: string; message: string }[]> {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(
    @Body() body: CreateMessageDto,
  ): Promise<{ id: string; message: string }> {
    return this.messagesService.create(body.message);
  }

  @Get('/:id')
  async getMessage(@Param('id') id): Promise<{ id: string; message: string }> {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
