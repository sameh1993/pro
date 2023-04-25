const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async function (data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      // user: testAccount.user, // generated ethereal user
      // pass: testAccount.pass, // generated ethereal password
      user: "samehsayed628@gmail.com", // generated ethereal user
      pass: "fxe6554huqpuaqanjwmh", // generated ethereal password
      // pass: "fxehuqpuaqanjwmh", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const result = await transporter.sendMail({
    from: '"sameh sayed" <samehsayed628@gmail.com>', // sender address
    to: "samehsayed628@gmail.com", // list of receivers
    subject: data.subject, // Subject line
    html: `
        <div>  <b> Sender Name: </b> ${data.username} </div>
        <div>  <b> Email: </b> ${data.email} </div>
        <div>  <b> Sender message: </b> ${data.message} </div>
    `, // html body
  });

  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return result;
};
