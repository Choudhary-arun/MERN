
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const { transporter } = require('./Email')
const { pool } = require("./database")
const secretKey = "VKT";
let otp;
let email;
let Barrier;



//In this i am create a login api using nodemailer and token using jwt.
const login = async (req, res) => {
  try {
    email = req.body.email;
    const password = req.body.password;

    const result = await pool.query(
      "SELECT email,password FROM employee2 WHERE email=$1 and password=$2",
      [email, password],
    );

    if (result.rows.length > 0) {
      otp = otpGenerator.generate(6, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
      })
      setTimeout(() => {
        otp = "";
      }, 30000)

      res.status(200).json({ success: "OTP SEND" })

      async function main() {
        try {
          const info = await transporter.sendMail({
            from: ' arunc0907@gmail.com',
            to: email,
            subject: "🔰Please deny if the mail not belongs to you.😎😎",
            text: `Your OTP is ${otp}`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml">
                        
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Verify your login</title>
                          <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
                        </head>
                        
                        <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
                          <table role="presentation"
                            style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
                            <tbody>
                              <tr>
                                <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                                  <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                                    <tbody>
                                      <tr>
                                        <td style="padding: 40px 0px 0px;">
                                          <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                                            <div style="color: rgb(0, 0, 0); text-align: left;">
                                              <h1 style="margin: 1rem 0">Verification code</h1>
                                              <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                                              <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                                              <p style="padding-bottom: 16px">If you didnt request this, you can ignore this email.</p>
                                              <p style="padding-bottom: 16px">Thanks,<br>The VKT team</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                            `,
          });
          console.log("Message sent: %s", info.messageId);
        } catch (emailErr) {
          console.error("Email sending error:", emailErr.message);
        }
      }
      main();
    }
    else {
      res.send({ success: "User not found" });
    }
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const validate = async (req, res) => {
  try {
    if (email == req.body.email && otp == req.body.otp) {
      jwt.sign({}, secretKey, { expiresIn: "3000s" }, (err, token) => {
        if (err) {
          throw err;
        }
        Barrier = token;
        Verify = token;
        const status = 200;
        const tokenRes = "Token sent successfully"
        res.status(200).json({
          token: Barrier,
          Status: status,
          TokenStatus: tokenRes
        })

        // sessionStorage
        sessionStorage.setItem("authToken", Barrier);

      });
      setTimeout(() => {
        Verify = ""
      }, 9000)

    }
    else {
      res.send({ message: "Invalid Credential" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  login,
  validate,
  Barrier,
};


