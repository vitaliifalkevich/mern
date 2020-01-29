const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('employees', EmployeesSchema);