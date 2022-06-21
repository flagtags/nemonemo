import productionEnv from './production';
import developmentEnv from './development';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    __dirname,
    '../../',
    process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env',
  ),
});

const selectConfig = (env: string) => {
  switch (env) {
    case 'production':
      return productionEnv;
    case 'development':
      return developmentEnv;
    default:
      return developmentEnv;
  }
};

const env = selectConfig(process.env.NODE_ENV);
env.mongodb.password = process.env.DATABASE_PASSWORD;

export default env;
