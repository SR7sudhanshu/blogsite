const express=require("express");
const app=express();
const ejs=require("ejs");
const path = require("path");
const port=8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

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