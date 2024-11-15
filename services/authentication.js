const jwt=require("jsonwebtoken");
const secret="SR7thegoat";
function createtokenforuser(user){
    console.log("user for token",user);
    const payload={
        id : user._id,
        fullname : user.fullname,
        email : user.email,
        role : user.role,
    }

    const token=jwt.sign(payload ,secret);

    return token;
}

function checktoken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createtokenforuser,
    checktoken,
}