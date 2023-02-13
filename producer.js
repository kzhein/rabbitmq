require('dotenv').config();
const amqp = require('amqplib');

const { RABBITMQ_URL, QUEUE_NAME } = process.env;
const message = process.argv.slice(2).join(' ');

const start = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME); // create the queue if not exists
  await channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

  await channel.close();
  await connection.close();
};

start();
