import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

export const config = {
  api: {
    host: env.API_HOST || 'http://127.0.0.1:3000',
  },
  content: {
    host: env.CONTENT_HOST || 'http://127.0.0.1:3000',
  },
  frontend: {
    host: env.FRONTEND_HOST || 'http://127.0.0.1:3001',
  },
  dev: {
    host: env.DEV_HOST || 'http://127.0.0.1:9000',
  },
  http: {
    port: +(env.HTTP_PORT || 3001),
  },
  site: {
    title: env.SITE_TITLE || 'Imageboard',
  },
};

export default config;
