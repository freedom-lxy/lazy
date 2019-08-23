import React, { Component } from 'react'
import styles from './index.module.scss'
import { Modal,Toast } from 'antd-mobile'
import './index.scss'
import ctx from '@/assets/js/ctx'

class Home extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            booklist: [],
            isAdd: false,
            userInfo: "",
            username:'',
            edit: true,
            token: '',
            sele:false,
        }
    }


    get isAll(){
        return this.state.booklist.every(e=>e.isChosen)
    }

    set isAll(val){
        const newList=this.state.booklist.concat()

        newList.forEach(e=>e.isChosen=val)

        this.setState({
            booklist:newList
        })
    }

    //单选
    chooseItem=(e,i)=>{
        const newList=this.state.booklist.slice()

        newList[i].isChosen=!e.isChosen

        this.setState({
            booklist:newList
        })
    }

    //全选
    chooseAll=()=>{
        this.isAll=!this.isAll
    }

    onDel=()=>{
        const booklist=this.state.booklist

        if(booklist.every(e=>!e.isChosen)){
            Toast.fail('请至少选择一本书籍')
            return
        }

        let id=''
        id=booklist.filter(e=>e.isChosen).map(e=>e.booksID).join()
        this.context.axios.post('/lxy/book/del',{
            booksID:id
        })
        .then((res)=>{
            const {code,msg}=res

            if(code==1){
                Toast.success(msg)
                const newList=booklist.concat()
                for(let i=0;i<newList.length;i++){
                    if(newList[i].isChosen){
                        newList.splice(i,1)
                        i--
                    }
                }
                this.setState({
                    booklist:newList,
                    edit: !this.state.edit
                })
            }else{
                Toast.fail(msg)
            }
        })
    }

    goread=(atoc,title)=>{
        this.props.history.push('/read/'+atoc+'&'+title)
    }
    

    
   

    changeEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }


    show = () => {
        this.setState({
            isAdd: !this.state.isAdd
        })
    }

    hide = () => {//隐藏用户信息
        this.setState({
            isAdd: false
        })
    }

    user = () => {
        if (!this.state.userInfo) {
            this.props.history.push('/login')
        }

    }

    reqUserInfo() {
        if(this.state.token){
            this.context.axios.post('/lxy/user/info', {
                token: this.state.token
            })
                .then((res) => {
                    const { code, msg, info } = res
                    if (code == 1) {
                        this.setState({
                            userInfo: info,
                            username:info.username
                        },()=>this.reqBooklist())
                    } else {
                        this.setState({
                            userInfo: null
                        })
                    }
                })
        }
        
    }

    reqBooklist() {
        if(this.state.userInfo){
            this.context.axios.post('/lxy/book/gain', {
                username: this.state.userInfo.username
            })
                .then((res) => {
                    const { code, msg, list } = res
                    if (code == 1) {
                        this.setState({
                            booklist: list
                        })
                    }
                })
        }
        
    }
    
    

    

    render() {
        return (
            <div className={styles.home}>
                <div className={styles.top}>
                    <img className={styles.userimg} src={require('@/assets/img/user.png')} alt="用户头像" onClick={this.show} />
                    <div>书架</div>
                    <div onClick={this.changeEdit}>{this.state.edit ? '编辑' : '完成'}</div>
                </div>
                <ul className={styles.Booklist}>
                    <>
                    {
                        this.state.booklist.length==0 && <p className={styles.p}>暂无书籍，赶快去书城添加书籍吧！</p>
                    }
                    </>
                    {
                    this.state.booklist.map((e, i) => {
                        return <li key={i} className={styles.book} >
                                <div className={styles.img} onClick={()=>this.goread(e.booksAtoc,e.booksName)}>
                                <img src={this.context.comUrl + e.booksImg} alt={e.booksName}
                                    className={styles.uIimgAuto} />
                                    </div>
                                    <p onClick={()=>this.goread(e.booksAtoc,e.booksName)}>{e.booksName}</p>
                                    {
                                    !this.state.edit&&
                                    <div className={styles.del}>
                                    <div className={styles.mask} onClick={()=>this.chooseItem(e,i)}>
                                        <span>
                                            <img src={require('@/assets/img/sel.png')} alt="" className={this.state.booklist[i].isChosen?styles.sel:''}  />
                                        </span>
                                    </div>
                                </div>
                                    }
                                   
                            </li>
                        })
                    }
                </ul>
                <Modal visible={this.state.isAdd} popup animationType="up" onClose={this.hide} className={styles.model} wrapClassName={styles.mm}>
                    <div className={styles.menu}>
                        <div className={styles.user} onClick={this.user}>
                            <img className={styles.uImgAuto}
                                src={require('@/assets/img/avatar.jpg')}
                                alt=""></img>
                            <p>{!this.state.userInfo ? '请登陆' : this.state.userInfo.username}</p>
                        </div>
                        <ul className={styles.userInfo}>
                            <li>
                                <img src={require('@/assets/img/feedback.png')} alt="反馈意见" />
                                <p>反馈建议</p>
                            </li>
                            <li>
                                <img src={require('@/assets/img/setting up.png')} alt="设置" />
                                <p>我的设置</p>
                            </li>
                        </ul>
                    </div>
                </Modal>
                {
                    !this.state.edit &&
                    <div className={styles.editBtn}>
                        <button onClick={this.chooseAll}>全选</ button>
                        <button onClick={this.onDel}>删除</ button>
                    </div>
                }

            </div>
        )
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({
            token
        }, () => {
            this.reqUserInfo()
            
        })
    }
}
export default Home