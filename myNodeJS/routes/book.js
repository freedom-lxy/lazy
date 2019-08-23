const express=require('express')
const Book=require('../db/model/book')

const router=express.Router()

//添加书本
router.post('/add',(req,res)=>{
    const {username,booksID,booksName,booksAtoc,booksImg}=req.body

    Book.find({
        username,booksID
    })
    .then((data)=>{
        if(data.length){
            res.send({
                code:-1,
                msg:'书籍已存在'
            })
            return 
        }else{
            Book.insertMany({
                username,booksID,booksName,booksAtoc,booksImg
            })
            .then((data)=>{
                res.send({
                    code:1,
                    msg:'添加到书架成功',
                    list:data
                })
            })
            .catch((err)=>{
                console.log(err)
                res.send({
                    code:0,
                    msg:'添加到书架失败',
                })
            })
        }
    })
    
})

//获取书籍

router.post('/gain',(req,res)=>{
    let{username}=req.body

    Book.find({
        username
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:"获取书架信息成功",
            list:data
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:0,
            msg:'获取书架信息失败'
        })
    })
})


//删除书籍
router.post('/del',(req,res)=>{
    const {booksID}=req.body
    const booksID_arr=booksID.split(',')
    Book.deleteMany({
        booksID:{$in:booksID_arr}
    })
    .then((data)=>{
        res.send({
            code:1,
            msg:'书籍删除成功'
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:0,
            msg:'书籍删除失败'
        })
    })
})




module.exports=router