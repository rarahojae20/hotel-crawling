// mysql.ts

import { Sequelize } from 'sequelize';
import { env } from '../env';
import logger from './logger';
import HotelData from 'src/models/hotel.model';
// import { Memo } from '../models/memos.model';
// import { User } from '../models/users.model';
// import { Comment } from '../models/comments.model';

const sequelize = new Sequelize(env.mysql.schema, null, null, {
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: env.mode.prod ? 5000 : 60000, // 5s for prod, 1min for dev
  },
  port: parseInt(env.mysql.port, 10),
  replication: {
    read: [
      {
        host: env.mysql.read.host,
        username: env.mysql.read.username,
        password: env.mysql.read.password,
      },
    ],
    write: {
      host: env.mysql.write.host,
      username: env.mysql.write.username,
      password: env.mysql.write.password,
    },
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    freezeTableName: true,
  },
  logging: (query) => {
    if (query?.includes('SELECT 1+1 AS result')) return;
    logger.sql(query);
  },
});

const sequalizeCore = new Sequelize(env.mysql.core.schema, null, null, {
  dialect: 'mysql',
  port: parseInt(env.mysql.core.port, 10),
  replication: {
    read: [
      {
        host: env.mysql.core.read.host,
        username: env.mysql.core.read.username,
        password: env.mysql.core.read.password,
      },
    ],
    write: {
      host: env.mysql.core.write.host,
      username: env.mysql.core.write.username,
      password: env.mysql.core.write.password,
    },
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    freezeTableName: true,
  },
  logging: (query) => {
    if (query?.includes('SELECT 1+1 AS result')) return;
    logger.sql(query);
  },
});

export function initModels() {
  HotelData.initModel(sequelize);

//   // Set up associations
}

export { sequelize as mysql, sequalizeCore as mysqlCore };

export function connect() {
  return new Promise(async (resolve, reject) => {
    initModels();
    try {
      await sequelize.authenticate();
      await sequalizeCore.authenticate();
      logger.log('MySQL Connection has been established successfully.');
      resolve(null);
    } catch (error) {
      logger.error('Unable to connect to the MySQL:', error);
      reject(error);
    }
  });
}
