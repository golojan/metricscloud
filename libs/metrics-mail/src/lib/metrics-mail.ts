// Library for sending email via nodemailer and smtp server
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
export interface MailOptions {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  subject: string;
  text: string;
  html: string;
}

// Create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '84912638d615c7fab87f10066ddfc934', // generated ethereal user
    pass: 'abf622807081550b330301532e319126', // generated ethereal password
  },
});

// send mail with defined transport object
export const sendMail = (templatename: string, mailOptions: MailOptions) => {
  const source = fs.readFileSync(
    `./templates/${templatename}.template.hbs`,
    'utf8'
  );
  const template = handlebars.compile(source);
  const html = template({
    name: mailOptions.toName,
    email: mailOptions.to,
  });
  transporter.sendMail(mailOptions, (error: Error, info: any) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};
