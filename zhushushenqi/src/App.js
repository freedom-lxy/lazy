import React from 'react';
import styles from './App.scss';
import './App.module.scss';
import classNames from 'classnames'

import { Route, NavLink, Link, Switch, Redirect, withRouter } from 'react-router-dom'
import routes from './routes.js'

function App(props) {
  // 从props中获取路由信息
  const pathname = props.location.pathname
  // 当前路由为首页、商品列表的时候，才会显示底部导航
  const showNav = /home|rank|search|classify/.test(pathname)

  //定义一个React元素
  const element = (
    <div className={styles.App}>
      <Switch>
        <Redirect from="/" to="/home" exact />{/*重定向 */}
        {routes.map(e => <Route {...e} />)}
      </Switch>
      {
        showNav && <div className='nav'>
          <NavLink to='/home'>
            <i className={classNames('iconfont', 'icon-shu')}></i>
            <span>书架</span>
          </NavLink>
          <NavLink to='/rank' >
            <i className={classNames('iconfont', 'icon-paihangbang')}></i>
            <span>排行</span>
          </NavLink>
          <NavLink to='/search' >
            <i className={classNames('iconfont', 'icon-sousuo')}></i>
            <span>搜索</span>
          </NavLink>
          <NavLink to='/classify' >
            <i className={classNames('iconfont', 'icon-fenlei')}></i>
            <span>分类</span>
          </NavLink>
        </div>
      }
    </div>
  )
  //导出一个React元素
  return element
}

export default withRouter(App);
