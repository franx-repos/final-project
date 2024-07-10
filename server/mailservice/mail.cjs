// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "jaekel.frank@gmx.de",
  from: "TaxMaxSup@gmail.com",
  templateId: "d-629749cfaa97424cb064320ed7fe9a71",
  dynamicTemplateData: {
    subject: "Thanks for Signing up",
    name: "Some One",
    city: "Denver",
  },
};
sgMail
  .send(msg)
  .then(() => {
      //console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
