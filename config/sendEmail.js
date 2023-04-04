const axios = require('axios');
async function getEmailToken() {
  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const grant_type = process.env.GRANT_TYPE;
    const responseToken = await axios.post('https://api.sendpulse.com/oauth/access_token', {
      grant_type: grant_type,
      client_id: clientId,
      client_secret: clientSecret,
    });
    return responseToken.data.access_token;
  } catch (e) {
    console.log(e);
  }
}

async function sendEmailUsingSendPulse(recipients, subject, contents, templateId) {
  try {
    const accessToken = await getEmailToken();
    // recipients = [
    //   { name: 'nasdf', email: 'yuanmai212@gmail.com' },
    //   { name: 'nasdf', email: 'julianyeo26@gmail.com' },
    // ];
    const message = {
      email: {
        subject: subject,
        from: {
          name: 'DentoConnect',
          email: process.env.EMAIL_USERNAME,
        },
        to: recipients,
        template: {
          id: templateId,
          variables: {
            username: recipients[0].name,
            passcode: contents,
          },
        },
      },
    };
    await axios.post('https://api.sendpulse.com/smtp/emails', message, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error('Human:SendPulse API Error:', error.message);
  }
}
module.exports = { sendEmailUsingSendPulse, getEmailToken };
