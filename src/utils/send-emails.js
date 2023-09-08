const nodemailer = require('nodemailer');
const { CONFIG } = require('../../config');

const transporter = nodemailer.createTransport({
  host: CONFIG.EMAIL.HOST,
  port: CONFIG.EMAIL.PORT,
  auth: {
    user: CONFIG.EMAIL.USERNAME,
    pass: CONFIG.EMAIL.PASSWORD,
  },
});

/**
 *
 * @param {*} message = { from: string, to: string, subject: string, text: string}
 * @returns
 */
exports.sendEmail = function (message) {
  // Send mail with defined transport object.
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      { ...message, from: CONFIG.EMAIL.FROM },
      (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        resolve(nodemailer.getTestMessageUrl(info));
      }
    );
  });
};
