import {config} from 'dotenv';
config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URI;
export const SERVER_SECRET = process.env.SERVER_SECRET;
export const ORIGIN_DOMAIN = process.env.ORIGIN_DOMAIN as string