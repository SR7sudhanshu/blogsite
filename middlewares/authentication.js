const {checktoken}=require("../services/authentication");

function checkauthentication(cookiename){
    return (req,res,next)=>{
        const tokenvalue=req.cookies[cookiename];
        
        if(!tokenvalue) return next();

        try {
            const user=checktoken(tokenvalue);
            console.log("user from the token is -------",user)
            req.user=user;
            console.log("check auth middleware user is ",req.user);
            return next();
        } catch (error) {
            
        }
        return next();
    }
}

module.exports={
    checkauthentication
}