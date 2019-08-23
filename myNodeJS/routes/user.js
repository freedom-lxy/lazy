const express=require('express')
const jwt=require('../utils/jwt')
const User=require('../db/model/user')

const router=express.Router()

//注册用户
router.post('/register',(req,res)=>{
    const {username,password}=req.body
    // 先从数据库的用户集合中查找这个用户名
    User.find({
        username
    })
    .then((data)=>{
        if(data.length){// 当找到了，直接返回错误信息
            res.send({
                code:2,
                msg:"用户名已存在"
            })
        }else{
            return User.insertMany({// 当没找到，就往这个集合中添加这条数据
                username,
                password,
            })
        }
    })
    .then((data)=>{
        if(data){
            res.send({
                code:1,
                msg:"注册成功"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:0,
            msg:'注册失败'
        })
    })
})

//登陆用户
router.post('/login',(req,res)=>{
    const {username,password}=req.body
    // 先从数据库的用户集合中查找这个用户名
    User.find({
        username,password
    })
    .then((data)=>{
        if(data.length){//当找到了，直接返回正确信息
            //生成一个token
            const token=jwt.createToken({
                username
            })
            // 把token当成一个普通的参数返回给前端
            res.send({
                code:1,
                msg:'登陆成功',
                token:token
            })
        }
        else{// 当没找到，直接返回错误信息
            res.send({
                code:0,
                msg:"登陆失败"
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:0,
            msg:'后端出错'

        })

    })
})

//用户信息
router.post('/info',(req,res)=>{
    const {token}=req.body
    // 1.检验token
    jwt.checkToken(token)
    .then((data)=>{
        // 2.获取用户名
        const {username}=data
        // 3.在用户集合中查询这个用户名对应的用户信息
        return User.find({
            username
        })
    })
    .then((data)=>{
        let info=data[0]
        // 4.返回用户信息
        res.send({
            code:1,
            msg:"获取用户信息成功",
            info,
        })
    })
    .catch((err)=>{
        console.log(err)
        res.send({
            code:2,
            msg:'获取用户信息失败'
        })
    })

})

// router.post("/add",(req,res)=>{
//     const {token,consignee,tel,region,address,postal}=req.body

    
// })




module.exports=router