const express = require('express');
const port = 5002;
const amqp = require('amqplib');
const bp = require('body-parser');
const execute_command = require('./utils');

var channel, connection;

const app = express();
app.use(bp.json());

connect();
async function connect() {
    try {
        const amqpServer = 'amqp://localhost:5672';
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("submissions");
        console.log("================== LISTENING =====================")
        channel.consume("submissions", async (data) => {
            const parsed = JSON.parse(Buffer.from(data.content));
            console.log("Parsed: ", parsed);
            
            const command = `python3 ../new_judge/judge.py ${parsed.solution_file} ${parsed.problem_obj.test_input} ${parsed.problem_obj.test_output}`;
            console.log("Command: ", command);

            const res = await execute_command(command);

            console.log("Res: ", res);
            console.log("Stdout: ", res.stdout);

            channel.ack(data);
            console.log("================== LISTENING =====================")
        })
    }
    catch (ex) {
        console.log("Error: ", ex.stack);
    }
}

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})