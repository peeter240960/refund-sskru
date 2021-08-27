const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
    {
        id: String,
        seq: String,
        university: String,
        campus: String,
        cid: String,
        sid: String,
        title: String,
        firstname: String,
        lastname: String,
        faculty: String,
        program: String,
        loantype: String,
        scholarshiptype: String,
        scholarship: String,
        tuitionfee: String,
        cidvalid: String,
        ciddup: String,
        prefer: String,
        level: String,
        role: String,
        created_at: Date,
        updated_at: Date,
    }
);
userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', userSchema, 'users');