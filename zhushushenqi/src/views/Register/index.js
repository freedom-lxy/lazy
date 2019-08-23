import React, { Component } from 'react'
import MyForm from '@/components/MyForm'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'

export class Register extends Component {
    
    onRegister=(res)=>{
        Toast.success('注册成功',2,()=>{
            this.props.history.replace('/login')
        })
    }
    render() {
        const {onRegister}=this
        return (
            <div>
            <MyForm btnText='注册' reqPath='/register' reqSuccess={onRegister}>
                <p key='header' className={styles.title}>账号注册</p>

                <div key='footer' className={styles.tip}>
                    <Link to='/login'>前去登陆</Link>
                    <Link to='/login'>完成注册</Link>
                </div>
            </MyForm>
        </div>
        )
    }
}

export default Register
