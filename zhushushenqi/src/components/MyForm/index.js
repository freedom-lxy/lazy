import React, { Component } from 'react'
import styles from './index.module.scss'
import {Toast} from 'antd-mobile'
import ctx from '@/assets/js/ctx'

export class MyForm extends Component {
    static contextType=ctx
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
    }
    iptusername=(event)=>{
        this.setState({
            username:event.target.value
        })
    }

    iptpassword=(event)=>{
        this.setState({
            password:event.target.value
        })
    }

    onClick=()=>{
        const {username,password}=this.state
        const {reqPath,reqSuccess}=this.props

        if(!username||!password){
            Toast.fail('请输入用户名和密码',3)
            return false
        }

        this.context.axios.post(`/lxy/user${reqPath}`,{
            username,password
        })
        .then((res)=>{
            const {code,msg}=res
            if(code==1){
                reqSuccess(res)
            }else{
                Toast.fail(msg)
            }
        })

    }

    render() {
        const {onClick,iptusername,iptpassword}=this
        const {btnText,children}=this.props
        const header=children.find(e=>e.key=='header')
        const footer=children.find(e=>e.key=='footer')
        return (
            
            <div className={styles.MyForm}>
                {header}

                <div className={styles.from}>
                    <input type="text" placeholder='请输入用户名' onChange={iptusername}/>
                    <input type="password" placeholder='请输入密码' onChange={iptpassword}/>
                </div>
                <button className={styles.btn} onClick={onClick}>{btnText}</button>

                {footer}


            </div>
        )
    }
}

export default MyForm
