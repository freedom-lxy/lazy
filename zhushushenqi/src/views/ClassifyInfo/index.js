import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import { PullToRefresh, ListView } from 'antd-mobile'

class ClassifyInfo extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            id: '',
            gender: "",
            minor: [],
            typeList: [
                { name: "热门", value: "hot" },
                { name: "新书", value: "new" },
                { name: "好评", value: "reputation" },
                { name: "完结", value: "over" },
                { name: "包月", value: "monthly" }
            ],
            type: "hot",
            nowMinor: '',
            booklist: [],
            isRefreshing: false,//是否正在下拉刷新
            page: 0,
            dataSource: new ListView.DataSource({ // 实例化长列表的数据源
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            start: 0,
            limit: 4,
        }
        this.mylist = React.createRef()
    }

    gosearch = () => {
        this.props.history.push('/search')
    }

    goreturn = () => {
        this.props.history.goBack()
    }

    gobook=(id)=>{
        this.props.history.push('/book/'+id)
    }

    reqMinor = () => {
        this.context.axios.get("/api/cats/lv2")
            .then((res) => {
                const type1 = res[this.state.gender].find(e =>
                    this.state.id == e.major
                )

                this.setState({
                    minor: type1.mins
                }, () => {
                   
                    this.loadTop()
                })

            })
    }

    reqbooklist(){
        const { gender, type, id, nowMinor, start, limit } = this.state
         return this.context.axios.get(`/api/book/by-categories?gender=${gender}&type=${type}&major=${id}&minor=${nowMinor}&start=${start}&limit=${limit}`)
        
    }

    loadTop=()=>{
        this.setState({
            isRefreshing:true,
            start:0,
        })
        this.reqbooklist()
        .then((res)=>{
            
            
            this.setState({
                booklist:res.books,
                isRefreshing:false,
                isLoadingMore:false,
                hasMore:true,
                dataSource: this.state.dataSource.cloneWithRows(res.books)
            })
        })
    }

    loadBottom = () => {
        
        //当没有更多数据的时候，就不再执行加载更多
        if (!this.state.hasMore) return false
        this.setState({
            isLoadingMore: true,
            start: this.state.start + 6,
        })
        this.reqbooklist()
            .then((res) => {
                const { books } = res
                if (books.length) {
                    const booklist = this.state.booklist.concat(books)
                    this.setState({
                        
                        dataSource: this.state.dataSource.cloneWithRows(booklist),
                        booklist
                    })
                } 
            })
       
    }



    seltype = (value) => {

        this.setState({
            type: value
        },()=>{
            this.reqMinor()
        })
    }
    settypes = () => {
        this.setState({
            nowMinor: ''
        },()=>{
            this.reqMinor()
        })
    }
    selminor = (e) => {
        this.setState({
            nowMinor: e
        },()=>{
            this.reqMinor()
        })
    }

    render() {
        return (
            <div className={styles.classifyinfo}>
                <div className='top2'>
                    <div>{this.state.id}</div>
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt="放大镜"></img>
                <img className={styles.return} onClick={this.goreturn} src={require('@/assets/img/return.png')} alt="返回" />

                {/*种类 */}
                <div className={styles.typenav}>
                    {
                        this.state.typeList.map((e, i) => {
                            return <span className={this.state.type == e.value ? styles.active : ""} onClick={() => this.seltype(e.value)} key={i}>{e.name}</span>
                        })
                    }
                </div>
                {/* 分类*/}
                <div className={styles.minornav}>
                    <span className={this.state.nowMinor == "" ? styles.active : ""}
                        onClick={this.settypes}>全部</span>
                    {this.state.minor.map((e, i) => {
                        return <span className={this.state.nowMinor == e ? styles.active : ""} key={i} onClick={() => this.selminor(e)}>
                            {e}
                        </span>
                    })}
                </div>

                
                    <ListView ref={this.mylist}
                        style={{
                            height: 'calc(100vh - 0.5rem)',
                            overflow: 'auto',
                        }}
                        dataSource={this.state.dataSource}
                        renderRow={
                            //  rowData:就是每行的列表数据
                            //   rowID：就是每行列表的编号
                            (rowData, sectionID, rowID) => {
                                return <div className={styles.content} iteminfo={rowData} key={rowID} onClick={()=>this.gobook(rowData._id)} >
                                    <div className={styles.bookdiv} key={rowData} >
                                        <div className={styles.book_img}>
                                            <img src={this.context.comUrl + rowData.cover} alt={rowData.title} />
                                        </div>
                                        <div className={styles.book_info}>
                                            <p className={styles.book_name}>{rowData.title}</p>
                                            <p className={styles.book_author}>{rowData.author}</p>
                                            <p className={styles.book_shortIntro}>{rowData.shortIntro}</p>
                                            <div className={styles.label}>
                                                <p>
                                                    <span>{rowData.latelyFollower}</span>
                                                    人气
                                                        </p>
                                                <p>|</p>
                                                <p>
                                                    <span>{rowData.retentionRatio}%</span>
                                                    留存
                                                        </p>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            }
                        }

                        pullToRefresh={
                            <PullToRefresh 
                            refreshing={this.setState.isRefreshing}
                            onRefresh={this.loadTop}
                            />
                        }
                        onEndReached={this.loadBottom}
                        onEndReachedThreshold={1}
                        renderFooter={() => {
                            const { isLoadingMore, hasMore } = this.state
                            return (
                                <div style={{ padding: 10, textAlign: 'center' }}>
                                    {isLoadingMore ? '正在加载中' : (hasMore ? '' : '没有更多数据了')}
                                </div>)
                        }}
                    >
                    </ListView>
                </div>
            
        )
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id,
            gender: this.props.location.pathname.split("/")[3]
        }, () => this.reqMinor())
    }
}      
export default ClassifyInfo