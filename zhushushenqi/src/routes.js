//引入各种路由组件
import Home from './views/Home'//首页
import Rank from './views/Rank' //排序
import RankList from './views/RankList' 
import Search from './views/Search'
import Book from './views/Book'
import Cata from './views/Cata'
import Read from './views/Read'
import Classify from './views/Classify'
import ClassifyInfo from './views/ClassifyInfo'
import Login from './views/Login'
import Feedback from './views/Feedback'
import Register from './views/Register'


import Error from './views/Error'

//配置不同路由的路径和组件内容
const routes=[
    {
        path:'/home',//路由路径
        key:'home',//路由名称 首页
        component:Home,//路由组件
        exact:true //严格查询，避免首页再出现其他页面高亮
    },
    {
        path:'/rank',
        key:'rank',
        component:Rank,
    },
    {
        path:'/ranList/:id&:id2&:id3&:id1',
        key:'rankList',
        component:RankList,
    },
    {
        path:'/search',
        key:'search',
        component:Search,
    },
    {
        path:'/book/:id',
        key:'book',
        component:Book,
    },
    {
        path:'/cata/:id&:id2&:id3',
        key:'cata',
        component:Cata,
    },
    {
        path:'/read/:id&:id2',
        key:'read',
        component:Read,
    },
    {
        path:'/classify',
        key:'classify',
        component:Classify,
    },
    {
        path:'/classinfo/:id',
        key:'classinfo',
        component:ClassifyInfo,
    },
    {
        path:'/login',
        key:'login',
        component:Login,
    },
    {
        path:'/register',
        key:'register',
        component:Register,
    },
    {
        path:'/feedback',
        key:'feedback',
        component:Feedback,
    },
    {
     path:'*',
     key:'error',//路径错误
     component:Error,
    },
]

export default routes