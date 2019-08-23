const jwt = require("jsonwebtoken")

//定义一个密钥
const secret = 'qwertyuiop'

// 定义一个用户信息
// const obj = {
//     username:"liuxinyi",
//     password: 123456
// }

// const token=jwt.sign(obj,secret)
// console.log(token)

module.exports = {
    //生成token
    createToken(obj) {
         // 根据传入的用户信息生成对应的token，过期时间的单位是秒
        return  jwt.sign(obj,secret
            // {expiresIn: 60 * 60}
        )},
    //2.检验token
    checkToken(token){
        //使用promis对异步操作进行封装
       return new Promise((resolve,reject)=>{
             //2.根据检验传上来的token，看它到底代表那个用户
        jwt.verify(token, secret, (err, data) => {
            if (!err) {//
                resolve(data)
            } else {
                reject('token校验失败')
            }
        })
        })
       
    }
}