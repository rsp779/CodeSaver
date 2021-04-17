const nodemailer=require('nodemailer');
const config=require('config');

const sendEmail=(options) =>{
    const transporter=nodemailer.createTransport({
        service :config.get('EMAIL_SERVICE'),
        auth:{
            user: config.get('EMAIL_USERNAME'),
            pass :config.get('EMAIL_PASSWORD'),
        },
    });


    const mailOptions={
    from:config.get('EMAIL_FROM'),
    to:options.to,
    subject:options.subject,
    html:options.text,
    };

    transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);
    }
    else{
        console.log(info);
    }
    });
};

module.exports=sendEmail;