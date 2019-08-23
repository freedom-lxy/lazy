// 引入aixos
import axios from 'axios'
// 引入loading组件
import {Toast} from 'antd-mobile'
// 引入createHashHistory
import {createHashHistory} from 'history'

// 添加请求拦截器
axios.interceptors.request.use(function(config){
	// 添加loading
	Toast.loading('加载中...',0)

	//添加所有axios请求路径的抬头
	// config.url='/api'+config.url

	// 添加所有请求的公共参数
	// config.data = config.data || {}
	// config.data.token = store.state.token

	return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response){
	// 关闭loading
	Toast.hide()


	

	// // 如果token失效，并且需要登录的时候，才会跳转到登录页(相当于给首页到登录页加了一个限制器，如果有nologin为true时，就让其跳转到登陆页面)
	// if(response.data.code == -2 && !noLogin) createHashHistory().push('/user/login')

	// 只返回服务器的响应内容,其实就是res.send里面的数据
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios
