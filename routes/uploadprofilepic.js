const express=require("express");
const router=express.Router();
const multer =require('multer');
const usermodel = require("../models/user");
const {authorization}=require("../middlewares/authorization");

router.get("/",(req,res)=>{
    res.render("uploadprofilepic",{
        user : req.user
    });
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `C:/Users/sudha/OneDrive/Desktop/coding/backend/nodejs/blogsite/public/uploads/profilepic`);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
});
  
const upload = multer({ storage: storage });


router.post("/",authorization ,upload.single("profilepic"), async (req, res) => {
    console.log(req.file);
    await usermodel.findByIdAndUpdate(req.user._id,{
        profilephotoURL : `/uploads/profilepic/${req.file.filename}`
    })
     res.redirect("/account/profile");
});




module.exports=router;