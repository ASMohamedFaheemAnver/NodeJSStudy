const rq = require("amqplib/callback_api");

function queueTwo(message) {
  rq.connect("amqp://localhost", (err, connection) => {
    if (err) process.exit();
    const queueName = "queuetwo";
    console.log(`${queueName} started queueing : ${message}`);

    connection.createChannel((err, channel) => {
      if (err) {
        console.error(err);
        process.exit();
      } else {
        console.log(`${queueName} started created a channel`);
        for (let i = 0; i < 1e9; i++) {}
        channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.of("ok".toString()));
      }
    });
  });
}

module.exports = queueTwo;
