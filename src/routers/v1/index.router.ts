import express from 'express';
import pingRouter from './ping.router';
import videoRouter from './video.router';

const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use('/videos',  videoRouter);

export default v1Router;