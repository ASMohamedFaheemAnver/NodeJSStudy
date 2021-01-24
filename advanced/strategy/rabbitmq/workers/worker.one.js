const rq = require("amqplib/callback_api");

rq.connect("amqp://localhost", (err, connection) => {
  if (err) process.exit();

  const queueName = "queueone";
  console.log(`${queueName} was created`);
  connection.createChannel((err, channel) => {
    if (err) {
      console.error(err);
    }
    channel.assertQueue(queueName, { durable: false });
    channel.consume(
      queueName,
      (message) => {
        console.log(`${queueName} with message : ${JSON.stringify(message)}`);
      },
      { noAck: true }
    );
  });
});
