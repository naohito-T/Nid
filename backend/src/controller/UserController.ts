import { NextFunction, Request, Response } from 'express';
import { User } from '../db/entity/User';
import { AppDataSource } from '../db/data-source';

export class UserController {
  // private userRepository = getRepository(User)
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne({});
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: request.params.id as unknown as number,
    });
    await this.userRepository.remove(userToRemove);
  }
}
