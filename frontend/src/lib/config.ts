import { env } from "process";


// export const SERVER_API_URL = env.SERVER_URL || "https://api.betitfy.com/api";
export const SERVER_API_URL = env.SERVER_URL || "http://192.168.0.20:8000/api";
// export const SOCKET_URL =  env.SERVER_SOCKET_URL || "https://api.betitfy.com"
export const SOCKET_URL =  env.SERVER_SOCKET_URL || "http://192.168.0.20:8000"
// export const SERVER_API_URL = process.env.SERVER_URL || "http://localhost:8000/api";

export const COIN_TO_USD = 1.14
