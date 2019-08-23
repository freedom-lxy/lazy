import React, { Component } from 'react'
import MyForm from '@/components/MyForm'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'



class Login extends Component {
    onLogin=(res)=>{
        Toast.success('登陆成功')
        const {token}=res
        localStorage.setItem('token',token)
        // this.props.history.goBack()
        this.props.history.push('/home')
    }
    

    render() {
        const { onLogin } = this
        return (
            <div>
                <MyForm btnText='登陆' reqPath='/login' reqSuccess={onLogin}>
                    <p key='header' className={styles.title}>账号登陆</p>

                    <div key='footer' className={styles.tip}>
                        <p>忘记密码</p>
                        <Link to='/register'>立即注册</Link>
                    </div>
                </MyForm>
            </div>
        )
    }
}
export default Login