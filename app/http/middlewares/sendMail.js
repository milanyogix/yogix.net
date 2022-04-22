const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const { oauth2 } = require("googleapis/build/src/apis/oauth2");

const CLIENT_ID = '579389181910-1kbjbbfngmbo5drn6fob1vfr3l6hk5lf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//042-xn-bvWBqGCgYIARAAGAQSNwF-L9IrBMTHlDkH7ylkI3sD7G5f3vk9bX9lvtY3CC73BK7pN0rY-goadBsCL-tImycJat8pmsE';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// user: "hello@yogix.ai",
// pass: "@Cookie2022",


module.exports.sendResetEmail = async(email, token) => {
    // change first part to your domain
    // http://localhost:3000/reset-password?token=
    try {
        const accessToken = await oauth2Client.getAccessToken();
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                type: 'OAuth2',
                user: "yogixdevteam@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        var url = "https://sportcoach.app/reset-password?token=" + token;

        const result = await smtpTransport.sendMail({
            from: "yogixdevteam@gmail.com",
            to: email,
            subject: "RESET YOUR PASSWORD",
            text: `Click on this link to reset your password ${url}`,
            html: `<h3> Click on this link to reset your password : ${url} </h3>`,
        });
        return result;
    } catch (error) {
        return error;
    }


};

module.exports.sendVerifyEmail = async(email, token) => {
    // change first part to your domain
    var url = "http://localhost:3000/user/verifyemail?token=" + token;

    await smtpTransport.sendMail({
        from: "milanpatel26092000@gmail.com",
        to: email,
        subject: "VERIFY Your EMAIL",
        text: `Click on this link to verify ${url}`,
        html: `<h3> Click on this link to verify your email : ${url} </h3>`,
    });
};