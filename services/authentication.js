const jwt=require("jsonwebtoken");

function createtokenforuser(user){
    console.log("user for token",user);
    const payload={
        id : user._id,
        fullname : user.fullname,
        email : user.email,
        role : user.role,
    }

    const token=jwt.sign(payload , "SR7thegoat");

    return token;
}

function checktoken(token){
    const payload=jwt.verify(token,"Sr7thegoat");
    return payload;
}

module.exports={
    createtokenforuser,
    checktoken,
}