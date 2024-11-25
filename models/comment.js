const { timeStamp } = require("console");
const {Schema ,model} = require("mongoose");

const commentschema=new Schema({
    comment : {
        type : String,
        required : true,
    },
    commentedby: {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    commenton : {
        type : Schema.Types.ObjectId,
        ref : "blog",
        required : true,
    }
},{timestamps : true});

const commentmodel=model("comment",commentschema);

module.exports=commentmodel;