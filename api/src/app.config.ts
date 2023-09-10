import * as dotenv from 'dotenv';

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRATION: process.env.JWT_EXPIRATION || '30d',
};
