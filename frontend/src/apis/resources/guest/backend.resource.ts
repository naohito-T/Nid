import { IGuestResource } from '@/apis/interfaces';
import { BackendBase } from '@/apis/services/backend';
import { User } from '@/@types/model';

/**
 * @desc Not login APIs.
 */
export class GuestResource extends BackendBase implements IGuestResource {
  constructor() {
    super();
  }

  // full pathでしかできない（csrで叩いているから？）
  public getUsers = async () => this.axios.get<User[]>('http://localhost:3100/v1/users');
  public getTest = async () => this.axios.get<User[]>('http://localhost:3100/v1/test');
}
