const AWS = require("aws-sdk");
require("dotenv").config();

const awsSESClient = new AWS.SES(
  process.env.NODE_ENV === "development"
    ? {
        endpoint: "http://localhost:4566/",
      }
    : {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      }
);

const sendEmail = async (to, name) => {
  awsSESClient.sendEmail(
    {
      Source: "faheem065@gmail.com",
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: `yo ${name}!` },
        Body: { Text: { Data: "udev" } },
      },
    },
    (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    }
  );
};

sendEmail("faheem065@gmail.com", "s1");
