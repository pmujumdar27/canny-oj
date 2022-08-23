const amqp = require('amqplib');

async function connect() {
    try {
        const amqpServer = 'amqp://localhost:5672';
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        console.log('[INFO] Connected to RabbitMQ');
        return {
            connection,
            channel
        }
    }
    catch (ex) {
        console.log('[ERROR] ', ex.stack);
        throw ex;
    }
}

module.exports = connect;