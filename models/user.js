const mongoose =require("mongoose");
const { createHmac } = require('node:crypto');

const secret="SR7blogs";  //hardcoding secret is a bad practice never do this (forecfully krna pd rha h)

const userschema=new mongoose.Schema({
    fullname : {
        type  : String,
        required : true,
    },
    email :{
        type : String,
        uniquie : true,
        required : true,
    },
    salt : {
        type : String,
        required : true,
    },
    password : {
        type :  String,
        required : true
    },
    profilephotoURL : {
        type : String,
        default : "/images/default.png"
    },
    role :{
        type : String,
        enum : ["NORMAL","ADMIN"],
        default : "NORMAL"
    },
},{timestamps : true });

const usermodel= mongoose.model("user",userschema);

//basically creating a password hashing so that the password is hidden form the server 

userschema.pre("save",function (next){
    const user=this;

    if(!user.isModified("password")) return ;

    const hash = createHmac('sha256', secret)
               .update(user.password)
               .digest('hex');

               this.password=hash;
               this.salt=secret;

               next();
})

module.exports=usermodel;