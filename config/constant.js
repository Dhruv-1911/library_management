
const Jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

module.exports.constant={

    JWT: Jwt,
    JWT_Secret: 'f23a1dfa4f8e14f13c09cf7ffab6532458a168465f84dc171e6fee5dfb1390e1',
    PASS: "adjueccrbftfzysi",
    expire:180000000,
    SALT: 10,
    nodemailer: nodemailer,
    bcrypt: bcrypt,
    Email: 'kakadiyadhruv868@gmail.com'

}