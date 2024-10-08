const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    }
})

const Role = mongoose.model('Role', roleSchema , "roles");
module.exports = Role