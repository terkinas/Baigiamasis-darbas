import express from 'express'
import session from 'express-session'
import http from 'http'

import { PORT, SERVER_SECRET } from './config'
import routesSetup from './api'

import expressConfig from './config/expressConfig'
import passportConfig from './config/passportConfig'
import { initSchedules } from './schedules/initSchedules'
import initializeGamesSetup from './initialization/initializeGamesSetup'
import socketConfig from './config/socketConfig'

import { initServerInstance } from './config/serverInstance'

const listEndpoints = require('express-list-endpoints')

const StartServer = () => {

    const app = express()

    const sessionMiddleware = session({
        secret: SERVER_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true
        },
    })

    app.use(sessionMiddleware)

    expressConfig(app)
    passportConfig(app)
    
    routesSetup(app)

    // const server = http.createServer(app)
    const server = initServerInstance(app)
    socketConfig()

    const routes = listEndpoints(app);
    console.log(routes);


    // const HOST = '0.0.0.0';
    const HOST = '192.168.0.20';

    // if not local
    // const serveris = server.listen(Number(PORT), HOST ,() => {

    // if local
    const serveris = server.listen(Number(PORT) , HOST, () => {
        const serverAddress = serveris.address()
       
        
        if (serverAddress && typeof serverAddress !== 'string') {
            const { address, port } = serverAddress;
            console.log(`Server running at http://${address}:${port}/`);
          } else {
            console.log(`Server running at http://localhost:${PORT}/`);
          }
        console.log(`Server is running on ip ${HOST} on port ${PORT}`)
    }).on('error', (error: Error) => {
        console.log('Error starting server', error)
        process.exit()
    })



    initializeGamesSetup()

    initSchedules()
}

StartServer()
