const express = require('express');
const userRouter = require('./routes/users');
const database = require('../../config/DatabaseConfig');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: "Hello, world!"
    });
})

app.use('/users', userRouter);

app.listen(port, (err) => {
    if(err) console.log('[ERROR] Error in listening!');
    else console.log(`[INFO] Listening on localhost:${port}`);
});