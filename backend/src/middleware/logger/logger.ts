import expressPino from 'express-pino-logger';
import pino from 'pino';

const logger = pino({
  name: 'nid-backend',
  level: process.env.LOG_LEVEL || 'info',
});

/**
 * @returns {expressPino, logger}
 */
export const setupLogger = () => {
  return [expressPino({ logger }), logger] as const;
};
