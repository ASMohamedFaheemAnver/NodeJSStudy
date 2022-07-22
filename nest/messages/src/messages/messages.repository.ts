import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  constructor() {}
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(message: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const messageObject = { message, id: randomUUID() };
    messages[messageObject.id] = messageObject;
    await writeFile('messages.json', JSON.stringify(messages));
    return messageObject;
  }
}
