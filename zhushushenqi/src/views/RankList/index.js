import React,{Component}  from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import { Tabs, WhiteSpace } from 'antd-mobile'

class  RankList extends Component{
    static contextType=ctx
    constructor(){
        super()
        this.state={
            rank:'',
            title:'',
            monthRank:'',
            totalRank:"",
            rankList:[],
            monthList:[],
            totalList:[]
        }
    }
    
    gobook=(id)=>{
        this.props.history.push('/book/'+id)
    }

    gosearch = () => {
        this.props.history.push('/search')
    }

    goreturn = () => {
        this.props.history.goBack()
    }

    reqRanklist(){
        this.context.axios.get(`/api/ranking/${this.state.rank}`)
        .then((res)=>{
            const{ranking}=res
            this.setState({
                rankList:ranking.books
            })
        })
    }

    reqMonthlist(){
        this.context.axios.get(`/api/ranking/${this.state.monthRank}`)
        .then((res)=>{
            const{ranking}=res
            this.setState({
                monthList:ranking.books
            })
        })
    }

    reqTotallist(){
        this.context.axios.get(`/api/ranking/${this.state.totalRank}`)
        .then((res)=>{
            const{ranking}=res
            this.setState({
                totalList:ranking.books
            })
        })
    }
    


    render() {
        const tabs = [
            { title: '周榜', sub: '1'},
            { title: '月榜', sub: '2' },
            { title: '总榜', sub: '3'},
          ];

        return(
            <div className={styles.ranklist}>
                <div className='top2'>
                    <div>{this.state.title}</div>
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt="放大镜"></img>
                <img className={styles.return} onClick={this.goreturn} src={require('@/assets/img/return.png')} alt="返回" />

                 {/*分类*/}
                {
                    this.state.monthRank!="undefined"&&
                    <div>
                    
                    <Tabs tabs={tabs}
                           initialPage={0}
                           tabBarPosition="top"
                           renderTab={tab => <span>{tab.title}</span>}
                       >
                       <div className={styles.content}>
                           {
                           this.state.rankList.map((e, i) => {
                               return <div className={styles.bookdiv} key={i} onClick={()=>this.gobook(e._id)}>
                                   <div className={styles.book_img}>
                                       <img src={this.context.comUrl+e.cover} alt={e.title} />
                                   </div>
                                   <div className={styles.book_info}>
                                       <p className={styles.book_name}>{e.title}</p>
                                       <p className={styles.book_author}>{e.author}</p>
                                       <p className={styles.book_shortIntro}>{e.shortIntro}</p>
                                       <div className={styles.label}>
                                           <p>
                                               <span>{e.latelyFollower}</span>
                                               人气
                                           </p>
                                           <p>|</p>
                                           <p>
                                               <span>{e.retentionRatio}%</span>
                                               留存
                                           </p>
                                       </div>
                                   </div>
                               </div>
                           })
                           }
                       </div>
                       <div className={styles.content}>
                           {
                           this.state.monthList.map((e, i) => {
                               return <div className={styles.bookdiv} key={i} onClick={()=>this.gobook(e._id)}>
                                   <div className={styles.book_img}>
                                       <img src={this.context.comUrl+e.cover} alt={e.title} />
                                   </div>
                                   <div className={styles.book_info}>
                                       <p className={styles.book_name}>{e.title}</p>
                                       <p className={styles.book_author}>{e.author}</p>
                                       <p className={styles.book_shortIntro}>{e.shortIntro}</p>
                                       <div className={styles.label}>
                                           <p>
                                               <span>{e.latelyFollower}</span>
                                               人气
                                           </p>
                                           <p>|</p>
                                           <p>
                                               <span>{e.retentionRatio}%</span>
                                               留存
                                           </p>
                                       </div>
                                   </div>
                               </div>
                           })
                           }
                       </div>
                       <div className={styles.content}>
                           {
                           this.state.totalList.map((e, i) => {
                               return <div className={styles.bookdiv} key={i} onClick={()=>this.gobook(e._id)}>
                                   <div className={styles.book_img}>
                                       <img src={this.context.comUrl+e.cover} alt={e.title} />
                                   </div>
                                   <div className={styles.book_info}>
                                       <p className={styles.book_name}>{e.title}</p>
                                       <p className={styles.book_author}>{e.author}</p>
                                       <p className={styles.book_shortIntro}>{e.shortIntro}</p>
                                       <div className={styles.label}>
                                           <p>
                                               <span>{e.latelyFollower}</span>
                                               人气
                                           </p>
                                           <p>|</p>
                                           <p>
                                               <span>{e.retentionRatio}%</span>
                                               留存
                                           </p>
                                       </div>
                                   </div>
                               </div>
                           })
                           }
                       </div>
                   </Tabs>
                   <WhiteSpace />
                   </div>
                }
                 
                
                
                {this.state.monthRank=='undefined'&&
                <div className={styles.content}>
                {
                this.state.rankList.map((e, i) => {
                    return <div className={styles.bookdiv} key={i} onClick={()=>this.gobook(e._id)}>
                        <div className={styles.book_img}>
                            <img src={this.context.comUrl+e.cover} alt={e.title} />
                        </div>
                        <div className={styles.book_info}>
                            <p className={styles.book_name}>{e.title}</p>
                            <p className={styles.book_author}>{e.author}</p>
                            <p className={styles.book_shortIntro}>{e.shortIntro}</p>
                            <div className={styles.label}>
                                <p>
                                    <span>{e.latelyFollower}</span>
                                    人气
                                </p>
                                <p>|</p>
                                <p>
                                    <span>{e.retentionRatio}%</span>
                                    留存
                                </p>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
                }
                
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            rank:this.props.match.params.id,
            monthRank:this.props.match.params.id2,
            totalRank:this.props.match.params.id3,
            title:this.props.match.params.id1
        
        },()=>{
            if(this.state.monthRank=="undefined"&&this.state.totalRank=="undefined"){
                this.reqRanklist()
            }else{
                this.reqMonthlist()
                this.reqTotallist()
                this.reqRanklist() 
            }

            
        })
    }
}
export default RankList