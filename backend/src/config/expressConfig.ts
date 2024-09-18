import express, { Application } from 'express'
import cors from 'cors'
import passport from 'passport'

import { ORIGIN_DOMAIN } from './index'

const expressConfig = (app: Application) => {

    app.use(express.json({
        limit: "1mb"
    }))

    app.use(express.urlencoded({ 
        extended: true, 
        limit: "1mb"
    }))

    app.use(cors({
        origin: 'http://localhost:3000',
        // origin: 'https://betitfy.com',

        credentials: true
    }))

    // app.use(cors())

    return app
}

export default expressConfig;
