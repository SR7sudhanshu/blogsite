const express=require("express");
const router=express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const commentmodel=require("../models/comment");

router.get("/add-new",(req,res)=>{
    res.render("addblog",{
        user : req.user
    })
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: storage });


  router.post("/addblog", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/dumps/blogs/${blog._id}`);
  });

  router.get("/blogs",async (req,res)=>{
      const allblogs=await Blog.find({});

      res.render("blogs",{
        user : req.user,
        blogs : allblogs
      })
  })

router.get("/blogs/:id",async(req,res)=>{
    const comments=await commentmodel.find({ commenton : req.params.id }).populate('commentedby');
    const blogofuser=await Blog.findById(req.params.id).populate('createdBy');
    console.log("blogofuser",blogofuser);
    res.render("blog",{
      user : req.user,
      blog : blogofuser,
      comments : comments,
    })
})  
router.post("/blogs/:id",async(req,res)=>{
  const { comment } =req.body;
  const user=req.user;
  const blogID=req.params.id;
  await commentmodel.create({
    comment,
    commentedby : user._id,
    commenton : blogID,
  })

    return res.redirect(`/dumps/blogs/${blogID}`);
})


module.exports=router;