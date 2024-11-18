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
    },
    commenton : {
        type : Schema.Types.ObjectId,
        ref : "blog",
    }
},{timestamps : true});

const commentmodel=model("comment",commentschema);

module.exports=commentmodel;