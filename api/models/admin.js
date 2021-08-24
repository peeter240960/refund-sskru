const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        token: { type: String, required: true },
    }, { timestamps: true }
);
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 6 * 60 * 60 });

module.exports = mongoose.model('Admin', userSchema, 'admins');