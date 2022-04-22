import http from 'http';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';
import { createApp } from './app';
import config from './config';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.locale('ru');

const app = createApp();
http.createServer(app.callback()).listen(config.http.port);
