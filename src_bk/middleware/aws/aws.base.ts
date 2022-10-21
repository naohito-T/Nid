import AWS from 'aws-sdk';
import { AWSSettings } from './aws.setting';

/**
 * @desc dynamoDBを作成する。
 */
export const createDynamoDB = (): AWS.DynamoDB => {
  return new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: AWSSettings.region,
    endpoint: AWSSettings.region,
  });
};

const DynamoDBStoreOptions = {
  // Optional DynamoDB table name, defaults to 'sessions'
  table: 'myapp-sessions',
  // Optional path to AWS credentials and configuration file
  // AWSConfigPath: './path/to/credentials.json',
  // Optional JSON object of AWS credentials and configuration
  AWSConfigJSON: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'ap-northeast-1',
  },
  // Optional client for alternate endpoint, such as DynamoDB Local
  client: new AWS.DynamoDB({
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'ap-northeast-1',
    endpoint: new AWS.Endpoint('http://192.168.11.102:8000'),
  }),
  // Optional ProvisionedThroughput params, defaults to 5
  readCapacityUnits: 5,
  writeCapacityUnits: 5,
  // セッション保持期間
  reapInterval: 24 * 60 * 60 * 1000,
};
