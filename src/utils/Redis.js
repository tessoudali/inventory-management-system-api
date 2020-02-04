import autoBind from 'auto-bind';
import redis from 'redis';
import { promisifyAll } from 'bluebird';

const Redis = promisifyAll(redis);

class RedisClient {
  /**
   * Creates an instance of RedisClient
   * @param {object} container
   * @memberof RedisClient
   */
  constructor({ config, logger }) {
    // create and connect to redis client
    this.client = Redis.createClient({
      host: config.cache.host,
      port: config.cache.port,
    });
    this.logger = logger;
    autoBind(this);
  }

  /**
   *@description Returns redis client
   *@returns {object} redis
   */
  getClient() {
    return this.client;
  }

  /**
   *@description Sets object
   *@param  {string} hash
   *@param  {string} key
   *@param  {object} value
   *@param  {number} expiryTime - in seconds
   *@returns {void}
   */
  async setObject(hash, key, value, expiryTime) {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    const keySet = await this.client.hsetAsync(hash, key, stringValue, 'EX', expiryTime);

    if (keySet === 0) this.logger.info(`Key: ${key} already exists in redis hash`);
    if (keySet === 1) this.logger.info(`Key: ${key} saved to redis`);
  }

  /**
   *@description Gets object
   *@param  {string} hash
   *@param  {string} key
   *@returns {object} - parsed data
   */
  async getObject(hash, key) {
    const value = await this.client.hgetAsync(hash, key);

    return value ? JSON.parse(value) : {};
  }

  /**
   *@description Deletes keys
   *@param  {string} key
   *@returns {void}
   */
  async deleteKey(key) {
    this.logger.info(`deleting object with key: ${key}...`);
    await this.client.delAsync(key);
  }

  /**
   *@description Closes redis connection
   *@returns {void}
   */
  async closeInstance() {
    await this.client.quit();
  }
}

export default RedisClient;
