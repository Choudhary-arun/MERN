const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    name: "ArunChoudhary",
    port: 465,
    secure: true,
    auth: {
        user: "arunc0907@gmail.com",
        pass: "vgvo nvli begl rsay",
    },
});

module.exports = { transporter };