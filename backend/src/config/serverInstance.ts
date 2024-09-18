import { Application } from 'express';
import http from 'http';

let serverInstance: http.Server | null = null;

export function getServerInstance() {
    if (!serverInstance) {
        serverInstance = http.createServer();
    }
    return serverInstance;
}

export function initServerInstance(app: Application) {
    if (!serverInstance) {
        serverInstance = http.createServer(app);
    }
    return serverInstance;
}