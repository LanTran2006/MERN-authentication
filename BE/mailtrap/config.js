import { MailtrapClient } from 'mailtrap'
import {config} from 'dotenv'
config()
const TOKEN = process.env.MAIL_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Lan Tran",
};
// const recipients = [
//   {
//     email: "lantrancute2006@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);