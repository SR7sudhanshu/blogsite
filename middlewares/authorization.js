const user=require("../models/user");

function authorization(req,res,next){
    if(req.user) return next();
    else {
        res.redirect("/blog/signin");
    }
}


module.exports={
    authorization
}