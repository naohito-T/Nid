import { BackendBase } from '@/apis/services/backend';
import type { IGuestResource } from '@/apis/interfaces/guest';
import type { UserType, SingValueType } from '@/schema';
/**
 * @desc Not login APIs.
 */
export class BackendGuestResource extends BackendBase implements IGuestResource {
  constructor() {
    super();
  }

  public singUp = async (singValue: SingValueType): Promise<UserType> => {
    return this.post<UserType, SingValueType>('/api/v1/sing-up', singValue);
  };

  public singIn = async (singValue: SingValueType): Promise<UserType> => {
    return this.post<UserType, SingValueType>('/api/v1/sing-in', singValue);
  };

  // full pathでしかできない（csrで叩いているから？）
  // public getUsers = async () => this.axios.get<User[]>('http://localhost:3100/v1/users');
  // public getTest = async () => this.axios.get<User[]>('http://localhost:3100/v1/test');
}
