import { IGuestResource } from '@/apis/interfaces';
import { BackendBase } from '@/apis/services/backend';
import { User } from '@/@types/model';

/**
 * @desc Not login APIs.
 */
export class GuestResource implements IGuestResource {
  private readonly backend = new BackendBase();

  public getUsers = async () => {
    const users = await this.backend.get<User[]>('/users');
    return users;
  };
}
