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
    const stringValue = await this.forceString(value);
    const keySet = await this.client.hsetAsync(hash, key, stringValue, 'EX', expiryTime);

    if (keySet === 0) this.logger.info(`Key: ${key} already exists in redis hash`);
    if (keySet === 1) this.logger.info(`Key: ${key} saved to redis`);
  }

  /**
   *@description Sets value
   *@param  {string} key
   *@param  {object} value
   *@param  {number} expiryTime - in seconds
   *@returns {void}
   */
  async set(key, value, expiryTime) {
    const stringValue = await this.forceString(value);
    const keySet = await this.client.setAsync(key, stringValue, 'EX', expiryTime);

    if (keySet === 0) this.logger.info(`Key: ${key} already exists in redis`);
    if (keySet === 1) this.logger.info(`Key: ${key} saved to redis`);
  }

  /**
   *@description Gets an object
   *@param  {string} hash
   *@param  {string} key
   *@returns {object} - parsed data
   */
  async getObject(hash, key) {
    const value = await this.client.hgetAsync(hash, key);

    return value ? JSON.parse(value) : {};
  }

  /**
   *@description Gets a value
   *@param  {string} key
   *@returns {object} - parsed data
   */
  async get(key) {
    const value = await this.client.getAsync(key);

    return value ? JSON.parse(value) : {};
  }

  /**
   *@description Deletes keys
   *@param  {string} key
   *@returns {void}
   */
  async deleteKey(key) {
    await this.client.delAsync(key);
    this.logger.info(`Object with key: ${key} deleted from redis!`);
  }

  /**
   *@description Closes redis connection
   *@returns {void}
   */
  async closeInstance() {
    await this.client.quit();
  }

  /**
   *@description Private function to force ket to be strings
   *@returns {void}
   */
  // eslint-disable-next-line class-methods-use-this
  async forceString(object) {
    return typeof object === 'string' ? object : JSON.stringify(object);
  }
}

export default RedisClient;
