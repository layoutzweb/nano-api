import restify from 'restify';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import {name, version} from './../package.json'


const server = restify.createServer({
    name: name,
    version: version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// logger
server.use(morgan('dev'));
server.pre(restify.plugins.dedupeSlashes());


// connect to db
initializeDb( db => {

    if(db) {
        // internal middleware
        app.use(middleware({ config, db }));

        // api router
        app.use('/api', api({ config, db }));
    }

    app.server.listen(process.env.PORT || config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
});

export default app;