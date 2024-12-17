require('dotenv').config()
const express=require("express");
const app=express();
const ejs=require("ejs");
const path = require("path");
const {connectDB}=require("./config/mongodbconnect");
const {checkauthentication}=require("./middlewares/authentication");
const cookieParser=require("cookie-parser");
const blogrouter=require("./routes/blog");
const {authorization}=require("./middlewares/authorization");
const useraccount=require("./routes/useraccount");

//mongoose connection
connectDB(process.env.MONGO_URL);

//set ejs view enigne
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middlewares
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkauthentication("token"));
app.use(express.static(path.resolve("./public")));


//routes
const staticrouter=require("./routes/user");

app.get("/",(req,res)=>{
    res.render("homepage",{
        user : req.user,
    });
})


//using routes
app.use("/blog",staticrouter);
app.use("/dumps",blogrouter);
app.use("/",useraccount);


app.listen(process.env.PORT,()=>{
    console.log("server is running");
})