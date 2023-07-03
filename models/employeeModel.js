const mongoose=require('mongoose')

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the employee name"],
    },
    email: {
        type: String,
        required: [true, "Please add the employee email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the employee phone number"],
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Employee",employeeSchema)