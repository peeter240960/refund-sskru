const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        max: { type: Number, required: true },
        current: { type: Number, required: true },
        type: { type: String, required: true },
        active: { type: Boolean, default: true }
    }
);

module.exports = mongoose.model('ServerProcess', userSchema, 'server_process');