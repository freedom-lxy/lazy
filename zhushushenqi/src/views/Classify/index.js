import React, { Component } from 'react'
import styles from './index.module.scss'
import { Tabs, WhiteSpace } from 'antd-mobile'
import ctx from '../../assets/js/ctx'


class Classify extends Component {
    static contextType=ctx
    constructor(){
        super()
        this.state={
            List:[],
            List1:[],
            List2:[],
        }
    }

    gosearch=()=>{
        this.props.history.push('/search')
    }

    goinfo=(name,name2)=>{
        this.props.history.push('/classinfo/'+name+"/"+name2)
    }

    reqList(){
        this.context.axios.get("/api/cats/lv2/statistics")
        .then((res)=>{
            const{male,female,press,ok}=res
           if(ok){
                this.setState({
                    List:male
                }) 
           }      
        })
    }
    reqList1(){
        this.context.axios.get("/api/cats/lv2/statistics")
        .then((res)=>{
            const{male,female,press,ok}=res
           if(ok){
                this.setState({
                    List1:female
                }) 
           }      
        })
    }
    reqList2(){
        this.context.axios.get("/api/cats/lv2/statistics")
        .then((res)=>{
            const{male,female,press,ok}=res
           if(ok){
                this.setState({
                    List2:press
                }) 
           }      
        })
    }
    render() {
        const tabs = [
            { title: '男生', sub: '1',name:'male' },
            { title: '女生', sub: '2',name:'female' },
            { title: '出版', sub: '3',name:'press' },
          ];
        return (
           
            <div className={styles.classify}>
                <div className='top2'>
                    <div>分类</div>
                </div>
                <img src={require('@/assets/img/magnifying.png')} onClick={this.gosearch} className={styles.magnifying} alt=""></img>

                {/* 种类*/}
                <div>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        tabBarPosition="top"
                        renderTab={tab => <span>{tab.title}</span>}
                    >
                        <ul className={styles.cell}>
                            {
                                this.state.List.map((e,i)=>{
                                    return<li className={styles.ce} onClick={()=>this.goinfo(e.name,tabs[0].name)} key={i}>
                                        <p className={styles.title}>
                                            {e.name}
                                        </p>
                                        <p className={styles.link}>({e.bookCount}本)</p>
                                    </li>
                                })
                            }
                        </ul>
                        <ul className={styles.cell}>
                            {
                                this.state.List1.map((e,i)=>{
                                    return<li className={styles.ce} onClick={()=>this.goinfo(e.name,tabs[1].name)} key={i}>
                                    <p className={styles.title}>
                                        {e.name}
                                    </p>
                                    <p className={styles.link}>({e.bookCount}本)</p>
                                </li>
                                })
                            }
                        </ul>
                        <ul className={styles.cell}>
                            {
                                this.state.List2.map((e,i)=>{
                                    return<li className={styles.ce} onClick={()=>this.goinfo(e.name,tabs[2].name)} key={i}>
                                    <p className={styles.title}>
                                        {e.name}
                                    </p>
                                    <p className={styles.link}>({e.bookCount}本)</p>
                                </li>
                                })
                            }
                        </ul>
                    </Tabs>
                    <WhiteSpace />
                </div>

            </div>
        )
    }
    componentDidMount(){
        this.reqList()
        this.reqList1()
        this.reqList2()
    }
}
export default Classify