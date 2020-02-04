import express from 'express';
import { listModules } from 'awilix';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const createApp = ({ logger, container, config }) => {
  const app = express();

  // Configure app (eg: security level, cors, logging req & parsing data)
  app.enable('trust proxy');
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Register routes
  app.get(`/${config.api.prefix}/status`, (req, res) => res.status(200).json({ status: 'OK' }));

  const routes = listModules('routes/*js', { cwd: __dirname });
  routes.forEach((route) => {
    const { name } = route;
    const endPoint = `/${config.api.prefix}/${name}`;

    app.use(endPoint, container.resolve(name));
    logger.info(`Mounted ${name} to ${endPoint}`);
  });

  // Handle all other routes (A.K.A 404)
  app.use('*', (req, res) => res.status(404).json({
    message: 'Oops! No such route!',
  }));

  return app;
};

export default createApp;
