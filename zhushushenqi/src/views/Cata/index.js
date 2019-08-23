import React,{Component}  from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'

class  Cata extends Component{
    static contextType=ctx
    constructor(){
        super()
        this.state={
            title:'',
            id:'',
            atoc:'',
            inversioFlag:true,
            cataList:[]
        }
    }

    gosearch = () => {
        this.props.history.push('/search')
    }

    goreturn = () => {
        this.props.history.goBack()
    }

    goread=(id,id2,)=>{
        this.props.history.push('/read/'+id+'&'+id2)
    }

    inver=()=>{
        this.setState({
            inversioFlag:!this.state.inversioFlag,
            cataList:this.state.cataList.reverse()
        })
    }

    reqCartList(){
        this.context.axios.get(`/api/atoc/${this.state.atoc}?view=chapters`)
        .then((res)=>{
            this.setState({
                cataList:res.chapters
            })
        })
    }

    render() {
        return(
            <div className={styles.cata}>
                <div className='top2'>
                    <div>{this.state.title}</div>
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt="放大镜"></img>
                <img className={styles.return} onClick={this.goreturn} src={require('@/assets/img/return.png')} alt="返回" />

                <div className={styles.cata_head}>
                    <p>{this.state.title}</p>
                    <div className={styles.inversion} onClick={this.inver}>
                        <span>{this.state.inversioFlag?'逆序':'正序'}</span>
                    </div>
                </div>
                <div className={styles.cate_content}>
                    <ul className={styles.cata_ul}>
                        {
                            this.state.cataList.map((e,i)=>{
                            return <li key={i} className={styles.cata_list} onClick={()=>this.goread(this.state.atoc,this.state.title)}>
                                {e.title}
                            </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.setState({
            id:this.props.match.params.id,
            title:this.props.match.params.id2,
            atoc:this.props.match.params.id3
        },()=>this.reqCartList())
    }
}
export default Cata