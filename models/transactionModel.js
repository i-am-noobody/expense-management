const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true,'User id is required']
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    type:{
        type:String,
        required:[true,'Type is required']
    },
    category:{
        type:String,
        required:[true,'Catrgory is required']
    },
    reference:{
        type:String,
    },
    description:{
        type:String,
        required:[true,"Please provide the descriptions"]
    },
    date:{
        type:Date,
        requird:[true,"Please provide the valid date"]
    }
},{timestamps:true})
const transactionModel = mongoose.model('tansactions',transactionSchema)
module.exports = transactionModel
