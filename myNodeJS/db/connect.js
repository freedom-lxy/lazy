const mongoose=require('mongoose')

//1.连接数据库
mongoose.connect('mongodb://localhost/zssq',{ useNewUrlParser: true })

//2.获取连接对象
const db=mongoose.connection

//3.如果连接成功
db.once('open',()=>{
    console.log('db ok')
})

//4.如果连接失败
db.once('error',()=>{
    console.log('db error')
})