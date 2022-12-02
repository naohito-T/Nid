import { z } from 'zod';

export const SignFlowScheme = z.enum(['google', 'twitter', 'github']);

export type SignFlow = z.infer<typeof SignFlowScheme>;
