import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'

class Search extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            isdel: false,
            bookval: '',
            books: []
        }
    }

    gobook=(id)=>{
        this.props.history.push('/book/'+id)
    }

    reqsearch() {
        return this.context.axios.get(`/api/book/fuzzy-search?query=${this.state.bookval}`)
    }

    bookva = (event) => {
        this.setState({
            bookval: event.target.value
        })
    }


    gosearch = () => {
        if (this.state.bookval.length > 0) {
            this.reqsearch(this.state.bookval)
                .then((res) => {
                    const { books } = res
                    this.setState({
                        books: books
                    })
                })
        }
        this.setState({
            isdel: !this.state.isdel
        })
    }

    keypress=(e)=>{
        if(e.which === 13){
            this.reqsearch(this.state.bookval)
                .then((res) => {
                    const { books } = res
                    this.setState({
                        books: books
                    })
                })
        }
        this.setState({
            isdel: !this.state.isdel
        })
    }

    del=()=>{
        this.setState({
            bookval:'',
            isdel: !this.state.isdel
        })
    }


    render() {
        return (
            <div className={styles.search}>
                <div className='top2'>
                    <div>搜索</div>
                </div>
                <div className={styles.search_list}>
                    <input type="search" value={this.state.bookval} onChange={this.bookva} onKeyPress={this.keypress} className={styles.input} placeholder="请输入您想要搜索的书名">
                    </input>
                    <img src={require('@/assets/img/magnifying.png')} className={styles.magnifying} alt="" onClick={this.gosearch}></img>
                    {
                        this.state.isdel && <img src={require('@/assets/img/del.png')} alt='删除' className={styles.delimg}  onClick={this.del}/>
                    }

                </div>

                {/*小说内容 */}
                <ul className={styles.searchlist}>
                    {
                        this.state.books.map((e,i)=>{
                            return <li className={styles.search_li} key={i} onClick={()=>this.gobook(e._id)}>
                                <div className={styles.list_img}>
                                    <img src={this.context.comUrl+e.cover} alt={e.title} className={styles.booksimg}/>
                                </div>
                                <div className={styles.list_info}>
                                    <p className={styles.list_title}>{e.title}</p>
                                    <p className={styles.list_autho}>{e.author}</p>
                                    <p className={styles.list_shortIntro}>{e.shortIntro}</p>
                                </div>
                            </li>
                        })
                    }
                </ul>

            </div>
        )
    }
    componentDidMount() {
        this.reqsearch()
    }
}
export default Search