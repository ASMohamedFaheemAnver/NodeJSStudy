const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret,
});

const from = "Vonage APIs";
const to = "94XXXXXX";
const text = "Hello from Vonage SMS API";

nexmo.message.sendSms(from, to, text);
