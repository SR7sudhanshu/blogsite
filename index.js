const express=require("express");
const app=express();
const ejs=require("ejs");
const path = require("path");
const port=8000;
const {connectDB}=require("./config/mongodbconnect");
const {checkauthentication}=require("./middlewares/authentication");
const cookieParser=require("cookie-parser");
const blogrouter=require("./routes/blog");
const {authorization}=require("./middlewares/authorization")

//mongoose connection
connectDB("mongodb://localhost:27017/blogusers");

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


app.listen(port,()=>{
    console.log("server has started");
})