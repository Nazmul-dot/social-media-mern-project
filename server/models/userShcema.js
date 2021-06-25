const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userShcema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        profilePic:{
            type:String,
        },
        coverPic:{
            type:String,
        },
        password: {
            type: String,
            required: true,
        },
        conferm_password: {
            type: String,
            required: true,
        },
        follwers: {
            type: Array,
            default: []
        },
        number_follwers: {
            type: Number,
            default: 0
        },
        follwings: {
            type: Array,
            default: []
        },
        number_follwings: {
            type: Number,
            default: 0
        },
        token: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)


userShcema.methods.tokengenaration = async function () {
    try {
        //console.log(process.env.KEY)
        //.env file theke newa variable
        const tokengen = jwt.sign({ _id: this._id.toString() }, process.env.KEY)
        this.token = tokengen;
        await this.save();
        return tokengen;
    } catch (error) {
        console.log("token creat part error part........")

    }
}


//hasing password.....
userShcema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();

})
// collection toiri
const USER = new mongoose.model("user", userShcema)
module.exports = USER;