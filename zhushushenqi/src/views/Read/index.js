import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import {Modal,Toast} from 'antd-mobile'
import './index.scss'

class Read extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            title1: '',//书名
            name: '',//章节名
            theme: {//初始化背景和字体颜色
                background: "#FAF9DE",
                color: "#000"
            },
            light: true,//是否是白天模式
            chapters: [],//获取章节列表
            atoc: '',//获取章节id
            fontSize: 0.38,//初始化字体大小
            textList: [],//小说章节内容
            allChapter: 0,//章节长度
            Chapter: 0,//用于获取第一章
            headflag: false,//是否显示
            settingflag: false,//设置是否显示
            popupVisible: false,//目录是否显示
            background: [
                { color: '#000', background: '#FAF9DE' },
                { color: '#000', background: '#e9faff' },
                { color: '#000', background: '#eefaee' },
                { color: '#000', background: '#C7EDCC' },
                { color: '#000', background: '#d2b48c' }
              ],
            
        }
    }

    goreturn = () => {
        this.props.history.goBack()
    }

    reqAtoc = () => {
        this.context.axios.get(`/api/atoc/${this.state.atoc}?view=chapters`)
            .then((res) => {
                this.setState({
                    chapters: res.chapters,
                    name: res.chapters[this.state.Chapter].title,
                    allChapter: res.chapters.length - 1
                }, () => {
                    this.reqTextList()
                })
            })
    }

    reqTextList = () => {
        const url = this.state.chapters[this.state.Chapter].link

        this.context.axios.get(`/content/chapter/${url}?k=2124b73d7e2e1945&t=1468223717`)
            .then((res) => {

                this.setState({
                    textList: res.chapter.body.split('\n')
                })

            })
    }

    headflag = () => {
        if(this.state.settingflag==false){
            this.setState({
                headflag: !this.state.headflag,
                
            })
        }else{
            this.setState({
                settingflag: !this.state.settingflag
                
            })
        }
        
    }

    golight = () => {
        this.setState({
            light: !this.state.light
        })
    }

    setting = () => {
        this.setState({
            headflag: !this.state.headflag,
            settingflag: !this.state.settingflag
        })
    }

    fontMinus=()=>{
        this.setState({
            fontSize:this.state.fontSize-0.02
        })
    }

    fontAdd=()=>{
        this.setState({
            fontSize:this.state.fontSize+0.02
        })
    }

    gobackground=(e)=>{
        this.setState({
            theme:e
        })
    }

    catalog=()=>{
        this.setState({
            popupVisible:!this.state.popupVisible,
            headflag:false,
        })
    }

    next=()=>{
        if(this.state.Chapter==this.state.allChapter){
            Toast.info('已经是最新章节了！',1)
        }else{
            this.setState({
                Chapter:this.state.Chapter+1
            },()=>{
                this.reqAtoc()
            })
        }
       
    }

    last=()=>{
        if(this.state.Chapter==0){
            Toast.info('已经是第一章了！',1)
        }else{
            this.setState({
                Chapter:this.state.Chapter-1
            },()=>{
                this.reqAtoc()
            })
        }
        
    }

    goread=(id)=>{
        this.setState({
            Chapter:id,
            popupVisible:false
        },()=>{
            this.reqAtoc()
        })
    }




    render() {
        return (
            <div className={styles.read} style={this.state.light == true ? this.state.theme : { background: '#000', color: '#eee' }}

            >
                {
                    this.state.headflag == true && <div className={styles.head}>
                        <img className={styles.return} onClick={this.goreturn} src={require('@/assets/img/return-1.png')} alt="返回" />
                    </div>
                }
                {
                    this.state.headflag == true && <div className={styles.read_foot}>
                        <ul className={styles.chapter}>
                            <li onClick={this.last}>上一章</li>
                            <li>{this.state.Chapter + 1}/{this.state.allChapter+1}</li>
                            <li onClick={this.next}>下一章</li>
                        </ul>
                        <ul className={styles.chapter}>
                            <li onClick={this.catalog}>目录</li>
                            <li onClick={this.golight}>{this.state.light == true ? '夜间' : '白天'}</li>
                            <li>反馈</li>
                            <li onClick={this.setting}>设置</li>
                        </ul>
                    </div>
                }
                {
                    this.state.settingflag == true && <div className={styles.read_setting}>
                        <ul className={styles.setting_ul}>
                            <li>
                                <p>字号</p>
                                <ul>
                                    <li className={styles.font_minus} onClick={this.fontMinus}>A--</li>
                                    <li className={styles.font_now}>{Math.floor((this.state.fontSize)*100)}</li>
                                    <li className={styles.font_add} onClick={this.fontAdd}>A++</li>
                                </ul>
                            </li>
                            <li>
                                <p>背景</p>
                                <ul className={styles.read_bg}>
                                    {
                                        this.state.background.map((e,i)=>{
                                            return <li className={styles.uCenInBlock} key={i}
                                            style={{background: e.background,color:e.color}} onClick={()=>this.gobackground(e)}
                                            >
                                            </li>
                                        })                                      
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                }
                {
                    this.state.popupVisible==true&&
                    <Modal visible={this.state.popupVisible} popup animationType="slide-down" onClose={this.catalog} className={styles.model1} >
                            <div className={styles.chapterall}>
                                <p>{this.state.title1}</p>
                                <ul>
                                   {this.state.chapters.map((e,i)=>{
                                       return <li key={i} onClick={()=>this.goread(i)}>
                                        {e.title}
                                       </li>
                                   })}
                                </ul>
                            </div>
                    </Modal>
                }
                <div className={styles.read_} onClick={this.headflag}>
                    <div className={styles.textcontent}>
                        <ul className={styles.read_text} style={{fontSize:this.state.fontSize+'rem'}}>
                            <li className={styles.text_title} style={{fontSize:this.state.fontSize+'rem'}}>{this.state.name}</li>
                            {
                                this.state.textList.map((e, i) => {
                                    return <li key={i} className={styles.book_text} style={{fontSize:this.state.fontSize+'rem'}} >
                                        {e}
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            atoc: this.props.match.params.id,
            title1: this.props.match.params.id2,
            
        }, () => {
            this.reqAtoc()
        })
    }

}
export default Read