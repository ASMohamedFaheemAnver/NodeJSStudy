import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
  async findOne(id: string): Promise<{ id: string; message: string }> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll(): Promise<{ id: string; message: string }> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(message: string): Promise<{ id: string; message: string }> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const messageObject = { message, id: randomUUID() };
    messages[messageObject.id] = message;
    await writeFile('messages.json', JSON.stringify(messages));
    return messageObject;
  }
}
