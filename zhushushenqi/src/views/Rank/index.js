import React,{Component}  from 'react'
import styles from './index.module.scss'
import ctx from '../../assets/js/ctx'

class  Rank extends Component{
    static contextType=ctx
    constructor(){
        super()
        this.state=({
            rankList:[],
            bag: [
                "#F5DAD9",
                "#FD9B78",
                "#DCF5D9",
                "#D9F5F2",
                "#D9E9F5",
                "#F0F5D9",
                "#DCD9F5"
            ],
        })
    }

    goranklist=(id,id1,id2,id3)=>{
        this.props.history.push('/ranList/'+id+"&"+id1+"&"+id2+"&"+id3)
    }

    reqRankList(){
        this.context.axios.get('/api/ranking/gender')
        .then((res)=>{
            const{male}=res
            this.setState({
                rankList:male.slice(0,7)
            })
        })  
    }
    gosearch=()=>{
        this.props.history.push('/search')
    }

    render() {
        const url='http://statics.zhuishushenqi.com'
        return(
            <div className={styles.rank}>
                <div className='top2'>
                    <div>排行榜</div>
                    
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt=""></img>
                <ul className={styles.rankul}>
                {
                    this.state.rankList.map((e,i)=>{
                        return <li className={styles.rankli} key={i} onClick={()=>this.goranklist(e._id,e.monthRank,e.totalRank,e.title)}>
                            <div className={styles.cover}>
                                <img className={styles.rankimg} src={url+e.cover} alt={e.title}/>
                            </div>
                            <div className={styles.empt} style={{background:[this.state.bag[i]
                            ]}}></div>
                            <p>{e.title}</p>
                        </li>
                    })
                }
                </ul>
                
            </div>
        )
    }
    componentDidMount(){
        this.reqRankList()
    }

}
export default Rank