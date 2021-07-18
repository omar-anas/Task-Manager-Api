const sgMail = require('@sendgrid/mail');



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomingEmail =(email,name)=>{
    sgMail.send({

        to: email, // Change to your recipient
        from: 'oa80206@gmail.com',
        subject: 'THANKS FOR JOINING US !',
        text: `welcome to the app ,${name}.Let me know how you get along with the app . `
    })

}

const sendCancelationEmail =(email,name)=>{
    sgMail.send({

        to: email, // Change to your recipient
        from: 'oa80206@gmail.com',
        subject: 'WE ARE SORRY TO SEE YOU GO',
        text: `GOODBYE ${name} , we hope to see you back soon`
    })

}

module.exports={
    sendWelcomingEmail,
    sendCancelationEmail
}
