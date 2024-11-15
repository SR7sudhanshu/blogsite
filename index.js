const express=require("express");
const app=express();
const ejs=require("ejs");
const path = require("path");
const port=8000;
const {connectDB}=require("./config/mongodbconnect");

//mongoose connection
connectDB("mongodb://localhost:27017/blogusers");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middlewares
app.use(express.urlencoded({extended : false}));

//routes
const staticrouter=require("./routes/user");

app.get("/",(req,res)=>{
    res.render("homepage");
})


//using routes
app.use("/blog",staticrouter);

app.listen(port,()=>{
    console.log("server has started");
})