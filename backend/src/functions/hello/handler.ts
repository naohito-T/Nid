import type { ValidatedEventAPIGatewayProxyEvent } from '@/libs/aws/api-gateway';
import { formatJSONResponse } from '@/libs/aws/api-gateway';
import { middyfy } from '@/libs/aws/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
