const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type: String, require:true
    },
    password :{
        type: String,
        required : true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true,
}
)
const userModel = mongoose.model('user',userSchema)
module.exports = userModel