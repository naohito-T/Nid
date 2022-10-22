import AWS from 'aws-sdk';
import { AWSSettings } from '@/configs';

/**
 * @desc dynamoDBを作成する。
 */
export const createDynamoDB = (): AWS.DynamoDB => {
  return new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    accessKeyId: AWSSettings.accessKeyId,
    secretAccessKey: AWSSettings.secretAccessKey,
    region: AWSSettings.region,
    endpoint: AWSSettings.endpoint,
  });
};
