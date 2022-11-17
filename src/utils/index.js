import Vue from 'vue'
import VueRouter from 'vue-router'
import BlackList from '@/pages/index'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: BlackList
	},
]

export default new VueRouter({
	routes
})