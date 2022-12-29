const dotenv = require('dotenv')
dotenv.config()

const {SECRET_KEY, REFRESH_SECRET_KEY} = process.env;

module.exports = {SECRET_KEY, REFRESH_SECRET_KEY}