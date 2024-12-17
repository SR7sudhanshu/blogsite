const {checktoken}=require("../services/authentication");

function checkauthentication(cookiename){
    return (req,res,next)=>{
        //get the token value for the user 
        const tokenvalue=req.cookies[cookiename];
        //if user is not logged in continue without adding the user info
        if(!tokenvalue) return next();
        //if got the - find the uesr if found add in req.user else return next ( adding the req.user as null )
        try {
            const user=checktoken(tokenvalue);
            console.log("user from the token is -------",user)
            req.user=user;
            return next();
        } catch (error) {
            
        }
        return next();
    }
}

module.exports={
    checkauthentication
}