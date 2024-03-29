import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

// Modifying request to hold currentUser object
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const { userId } = req.session;
    if (userId) {
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
