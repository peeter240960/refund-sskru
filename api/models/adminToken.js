const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')
const userSchema = new Schema(
    {
        token: { type: String, required: true },
        expire: { type: Date, default: moment().add(14, 'hours').format() },
        createdAt: { type: Date, default: moment().add(7, 'hours').format() }
    }
);

module.exports = mongoose.model('AdminToken', userSchema, 'admin_tokens');