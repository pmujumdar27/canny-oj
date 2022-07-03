const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: "Hello, world!"
    });
})

app.listen(port, (err) => {
    if(err) console.log('[ERROR] Error in listening!');
    else console.log(`[INFO] Listening on localhost:${port}`);
});