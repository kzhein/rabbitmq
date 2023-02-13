require('dotenv').config();
const amqp = require('amqplib');

const { RABBITMQ_URL, QUEUE_NAME } = process.env;

const start = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME); // create the queue if not exists
  channel.consume(QUEUE_NAME, message => {
    console.log(message.content.toString());
    channel.ack(message); // tell RabbitMQ that this message has been received, processed and that RabbitMQ is free to delete it
  });

  console.log('Waiting for the messages...');

  // await channel.close();
  // await connection.close();
};

start();
