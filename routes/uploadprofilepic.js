const express=require("express");
const router=express.Router();
const multer=require('multer');
const usermodel = require("../models/user");

router.get("/",(req,res)=>{
    res.render("uploadprofilepic",{
        user : req.user
    });
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/profilepic/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}-${Math.random()}`;
      cb(null, fileName);
    },
});
  
const upload = multer({ storage: storage });


router.post("/", upload.single("profilepic"), async (req, res) => {
    const user = await usermodel.findByIdAndUpdate(req.user._id,{ $set : {
        profilephotoURL : `/uploads/${req.user._id}/${req.file.filename}`
    }})
    return res.redirect("/account/profile");
});




module.exports=router;