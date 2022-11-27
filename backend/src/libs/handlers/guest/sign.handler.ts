import { validateRequest } from 'zod-express-middleware';
import { GuestController } from '@/interfaces/controllers';
import { SignValueScheme } from '@/schema';

export const SignHandler = () => {
  const guestController = new GuestController();
  return {
    validation: validateRequest({ body: SignValueScheme }),
    controller: guestController.signUp,
  };
};
