import { Router, Application } from "express";
import userRoutes from "./user";
import rouletteRoutes from "./roulette";
import livechatRoutes from "./livechat";
import cryptoRoutes from "./crypto";

const routesSetup = (app: Application) => {
    const router = Router();
    
    router.use('/user', userRoutes)
    router.use('/roulette', rouletteRoutes)
    router.use('/livechat', livechatRoutes)
    router.use('/crypto', cryptoRoutes)
   
    app.use('/api', router)
}

export default routesSetup;