import cors from 'cors';
import { excludeSpaceWithSplit } from '@/utils';

export const corsOptions: cors.CorsOptions = {
  origin: excludeSpaceWithSplit(',', process.env.CORS_ALLOW_ORIGIN),
};
