const mongoose=require('mongoose')

//1:定义一个集合的结构，这个集合中每条数据由那些字段
const bookScheama=new mongoose.Schema({
    username:{type:String,required:true},
    booksID:{type:String,required:true},
    booksName:{type:String,required:true},
    booksAtoc:{type:String,required:true},
    booksImg:{type:String,required:true},
})

//实例化一个操作用户集合的model，相当于一个集合
const Book=mongoose.model('book',bookScheama)

//导出这个model
module.exports=Book