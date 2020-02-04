import dotenv from 'dotenv';

dotenv.config();

// required environment variables
const REQUIRED_ENVIRONMENT_VARIABLES = ['NODE_ENV', 'PORT', 'API_PREFIX'];

REQUIRED_ENVIRONMENT_VARIABLES.forEach((name) => {
  if (!process.env[name]) throw new Error(`Environment variable ${name} is REQUIRED!`);
});

const config = {
  env: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  db: {
    test: process.env.TEST_DATABASE_URL,
    dev: process.env.DATABASE_URL,
  },
  logs: {
    label: process.env.LOG_LABEL,
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

export default config;
