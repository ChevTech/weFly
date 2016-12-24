'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function emailOffers() {
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'Test.Stoytchev@gmail.com',
            pass: 'Popa007!@'
        }
    };

    var transporter = _nodemailer2.default.createTransport(smtpConfig);

    var mailOptions = {
        from: 'Test.Stoytchev@gmail.com', // sender address 
        to: 'Anton.Stoytchev@gmail.com', // list of receivers 
        subject: 'New Trips Found!', // Subject line 
        text: 'Trips' };

    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
})();