import { RedisModuleOptions } from './redis.interfaces';
import * as Redis from 'ioredis';
import {
  REDIS_MODULE_CONNECTION,
  REDIS_MODULE_CONNECTION_TOKEN,
  REDIS_MODULE_OPTIONS_TOKEN
} from './redis.constants';

export function getRedisOptionsToken(connection?: string): string {
  return `${ connection || REDIS_MODULE_CONNECTION }_${ REDIS_MODULE_OPTIONS_TOKEN }`;
}

export function getRedisConnectionToken(connection?: string): string {
  return `${ connection || REDIS_MODULE_CONNECTION }_${ REDIS_MODULE_CONNECTION_TOKEN }`;
}

export function createRedisConnection(options: RedisModuleOptions) {
  const { config } = options;
  if (config.url) {
    return new Redis(config.url, config);
  } else if (config.isCluster) {
    return new Redis.Cluster(config.nodes, config);
  } else {
    return new Redis(config);
  }
}
