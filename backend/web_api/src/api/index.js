const express = require('express');
const userRouter = require('./routes/users');
const problemRouter = require('./routes/problems');
const submissionRouter = require('./routes/submissions');
const database = require('../../config/DatabaseConfig');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connect = require('../utils/rabbitmq');

async function init() {
    dotenv.config();
    
    const app = express();
    app.use(morgan('dev'));
    
    app.use(cors());

    const { connection, channel } = await connect();

    app.set('connection', connection);
    app.set('channel', channel);
    
    app.get('/', (req, res) => {
        res.json({
            message: "Hello, world!"
        });
    })
    
    app.use('/users', userRouter);
    app.use('/problems', problemRouter);
    app.use('/submissions', submissionRouter);

    return app;
}

init().then(
    app => {
        const port = process.env.PORT || 3000;

        if (app) {
            const server = app.listen(port, (err) => {
                if(err) console.log('[ERROR] Error in listening!');
                else console.log(`[INFO] Listening on localhost:${port}`);
            })
        }
    }
)
