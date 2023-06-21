const sgMail = require('@sendgrid/mail');
// const key="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"



const sendEmail = async (to, subject, text) =>{
        try {
        await sgMail.setApiKey('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');
          const email = {
            to: to,
            from: 'passbooklets@gmail.com',
            subject: subject,
            text: text
          };
         await sgMail.send(email)
         .then(() => {
           console.log('Email sent successfully!');
         })
         .catch((error) => {
          console.error('Error sending email:', error);
          console.error('SendGrid response:', error.response.body);
        });
        } catch (error) {
            console.log("error", error);
        }
    
}

module.exports = {sendEmail};