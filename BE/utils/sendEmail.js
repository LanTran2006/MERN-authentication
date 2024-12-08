import { client, sender } from "../mailtrap/config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../mailtrap/template.js";
export async function sendCode(email,code){
  const recipients = [
    {
      email,
    },
  ];
  await client.send({
    from: sender,
    to: recipients,
    subject: "verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code),
    category: "email verification"
  });
}
export async function sendLink(email,link){
  const recipients = [
    {
      email,
    },
  ];
  await client.send({
    from: sender,
    to: recipients,
    subject: "verify your email",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",link),
    category: "email verification"
  });
}