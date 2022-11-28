import { IGuestFrontendResource } from '@/apis/interfaces/guest';
import { FrontendBase } from '@/apis/services/frontend';
import { SignValue, User, JWT } from '@/schema';
import { GuestRepository } from '@/domain/repository';
import { User as UModel } from '@/domain/models';
import { generateJWT } from '@/middleware/jwt';

/**
 * @desc serviceの役割として、リポジトリで取得した値をモデルに突っ込み、それをコントローラに渡す。
 */
export class FrontendGuestResource extends FrontendBase implements IGuestFrontendResource {
  public signUp = async (signValue: SignValue): Promise<string> => {
    // email取得

    await GuestRepository.findByEmail(signValue.email);
    // 新規作成（user）＆ resを返す。
    // create してから
    // const newUser = await GuestRepository.create();

    // await GuestRepository.save();
    return generateJWT('dm');
  };
}
