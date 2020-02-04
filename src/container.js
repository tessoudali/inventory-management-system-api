import {
  createContainer, asFunction,
  asValue, Lifetime, asClass,
} from 'awilix';
import config from './config';
import createLogger from './logger';
import connectToDatabase from './db';
import createApp from './index';
import RedisClient from './utils/Redis';

const configureContainer = () => {
  // Create IoC container for dependency injection
  const container = createContainer();
  const databaseURL = config.env === 'test'
    ? config.db.test : config.db.dev;

  // Register config and logger in the container
  container.register({
    config: asValue(config),
    logger: asFunction(createLogger)
      .inject(() => ({
        label: config.logs.label,
        level: config.logs.level,
        filename: config.logs.filename,
      }))
      .singleton(),
    db: asFunction(connectToDatabase)
      .inject(() => ({ databaseURL }))
      .singleton(),
  });

  // Auto-register repositories, services, controllers and routes
  container.loadModules([
    ['repositories/*.js', Lifetime.SCOPED],
    ['middlewares/*.js', Lifetime.SCOPED],
    ['services/*.js', Lifetime.SCOPED],
    ['controllers/*.js', Lifetime.SCOPED],
    ['routes/*.js', Lifetime.SINGLETON],
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
  });

  // Register the express application and server last (it will auto-mount routers)
  container.register({
    app: asFunction(createApp)
      .inject(() => ({ container }))
      .singleton(),
    cache: asClass(RedisClient)
      .inject(() => ({ container }))
      .singleton(),
  });

  return container;
};

export default configureContainer;
