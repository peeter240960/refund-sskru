const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
    {
        id: String,
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
        confirm: String,
        right: String,
        regisfee: String,
        entfee: String,
        govdiscount: String,
        unidiscount: String,
        discount: String,
        tuitionbalance: String,
        paidtype: String,
        paid: String,
        refund: String,
        timestamp: String,
        confirmlog: String,
        macaddress: String,
        status: String,
        address: String,
        bookbank: String,
        bank: String,
        branch: String,
        bookbanktype: String,
        role: String,
        tel: String,
        email: String,
    }
);
userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', userSchema, 'users');