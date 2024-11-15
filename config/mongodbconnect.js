const mongoose=require("mongoose");

async function connectDB(url){
    return await mongoose.connect(url).then(
        console.log("mongo connected"))
        .catch((err)=>{
            console.log("error",err)
        })
    }


module.exports={
    connectDB
};