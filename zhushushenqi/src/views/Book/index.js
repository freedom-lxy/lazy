import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import {Toast} from 'antd-mobile'

class Book extends Component {
    static contextType=ctx
    constructor() {
        super()
        this.state = {
            id:'',
            booklist: [],
            relation:[],
            atoc:'',
            username:'',
            token:'',
            userInfo:''
        }
    }

    gocata=(id,id2,id3)=>{
        this.props.history.push('/cata/'+id+'&'+id2+'&'+id3)
    }

    goreade=(id,title)=>{
        this.props.history.push('/read/'+id+"&"+title)
    }

    gobook=(id)=>{
        this.setState({
            id:id
        },()=>{
            this.reqBook()
            this.reqRelation()
            this.reqAtoc()
        })
    }

    gosearch = () => {
        this.props.history.push('/search')
    }

    goreturn = () => {
        this.props.history.goBack()
    }

    reqBook(){
        this.context.axios.get(`/api/book/${this.state.id}`)
        .then((res)=>{
            this.setState({
                booklist:res
            })
        })
    }
    
    reqRelation(){
        this.context.axios.get(`/api/book/${this.state.id}/recommend`)
        .then((res)=>{
            this.setState({
                relation:res.books.slice(0,6)
            })
        })
    }

    reqAtoc(){
        this.context.axios.get(`/api/atoc?view=summary&book=${this.state.id}`)
        .then((res)=>{
            this.setState({
                atoc:res[1]._id
            })
        })
    }

    reqUserInfo(){
        if(this.state.token){
            this.context.axios.post('/lxy/user/info',{
                token:this.state.token
            })
            .then((res)=>{
                const {code,msg,info}=res
                if(code==1){
                    this.setState({
                        userInfo:info,
                        username:info.username
                    },()=>this.gain())
                }else{
                    this.setState({
                        userInfo:null
                    })
                }
            })
        }
        
    }


    gain(){
        if(this.state.token){
            this.context.axios.post('/lxy/book/add',{
                username:this.state.username,
                booksID:this.state.id,
                booksName:this.state.booklist.title,
                booksAtoc:this.state.atoc,
                booksImg:this.state.booklist.cover
            })
            .then((res)=>{
                const {code,msg}=res
                if(code==1){
                    Toast.success(msg,1)
                }else{
                    Toast.fail(msg,1)
                }
            })
        }else{
            Toast.info('用户未登录，请前去登陆',2,()=>this.props.history.push('/register'))
            
        }
        
    }

    render() {
        return (
            <div className={styles.book}>
                <div className='top2'>
                    <div>{this.state.booklist.title}</div>
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt="放大镜"></img>
                <img className={styles.return} onClick={this.goreturn} src={require('@/assets/img/return.png')} alt="返回" />

                {/*书架封面*/}
                <div className={styles.book_head}>
                    <div className={styles.book_img}>
                        <img src={this.context.comUrl+this.state.booklist.cover} className={styles.uImgAuto} alt='封面'/> 
                    </div>
                    <div className={styles.book_title}>
                        <p className={styles.book_name}>{this.state.booklist.title}</p>
                        <p className={styles.book_author}>{this.state.booklist.author}</p>
                        <p className={styles.book_author}>类型:{this.state.booklist.majorCate}</p>
                        {
                            this.state.booklist.wordCount&&
                            <p className={styles.book_author}>字数:{Math.round((this.state.booklist.wordCount)/10000)}万字</p>
                        }
                        
                    </div>
                </div>
                {/*书籍简介 */}
                <div className={styles.book_frame}>
                    <p className={styles.lastChapter}>
                    最新章节:
                    <span>{this.state.booklist.lastChapter}</span>
                    </p>
                    <div className={styles.book_longIntro}>
                        <p>{this.state.booklist.longIntro}</p>
                    </div>
                </div>
                {/* 目录*/}
                <div className={styles.catalog} onClick={()=>this.gocata(this.state.id,this.state.booklist.title,this.state.atoc)}>
                    <p className={styles.frame_title}>目录</p>
                    <span>浏览目录</span>
                </div>

                {/*相关书籍*/}
                <div className={styles.book_relation}>
                    <p className={styles.frame_title}>猜你喜欢</p>
                    <ul>
                        {
                            this.state.relation.map((e,i)=>{
                                return <li key={i} onClick={()=>this.gobook(e._id)}>
                                    <div className={styles.relation_img}>
                                        <img src={this.context.comUrl+e.cover} className={styles.uImgAuto} alt={e.title}/>
                                    </div>
                                    <p className={styles.txt_ellipsis}>{e.title}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>

                {/*底部按钮 */}
                <div className={styles.bottom}>
                    <button className={styles.add} onClick={()=>this.gain(this.state.id,this.state.atoc,this.state.booklist.title)}>加入书架</button>
                    <button className={styles.reade} onClick={()=>this.goreade(this.state.atoc,this.state.booklist.title)}>立即阅读</button>
                </div>

            </div>
        )
    }
    

    componentDidMount(){
        const token=localStorage.getItem('token')
        this.setState({
            id:this.props.match.params.id,
            token
        },()=>{
            this.reqUserInfo()
            this.reqBook()
            this.reqRelation()
            this.reqAtoc()
        })
    }
    
}
export default Book