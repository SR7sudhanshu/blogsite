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


//basically creating a password hashing so that the password is hidden form the server 
userschema.pre("save",function (next){
    const user=this;
    
    if(!user.isModified("password")) {console.log("not modified password"); return ;}
    
    const hash = createHmac('sha256', secret)
    .update(user.password)
    .digest('hex');
    
        this.password=hash;
        this.salt=secret;

            next();
})
            
            //static function in the schema to check the password is valid returns a boolean
userschema.static("matchpassword",async function (email,password) {
    const user=await this.findOne({email});
                
    if(!user ) return false;
                
    const givenpasswordHash = createHmac('sha256', secret)
        .update(password)
        .digest('hex');
                
    if(givenpasswordHash === user.password ) return {user};
    else return false;
                
});
            
const usermodel= mongoose.model("user",userschema);

module.exports=usermodel;