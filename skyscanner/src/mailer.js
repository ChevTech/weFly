import nodemailer from 'nodemailer';

function email(text){
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'Test.Stoytchev@gmail.com',
            pass: 'Popa007!@'
        }
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
        from: 'Test.Stoytchev@gmail.com', // sender address 
        to: 'Anton.Stoytchev@gmail.com', // list of receivers 
        subject: 'New trips available!', // Subject line 
        text: text, // plaintext body  
    };
        
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};

export { email };