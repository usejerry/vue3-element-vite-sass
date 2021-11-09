import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '@/components/Weather2/index.vue'
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		redirect: '/dashboard',
		children:[
			{
				path: '/dashboard',
				name: 'dashboard',
				meta: {
					title: '系统首页',
				},
				component: () =>
					import(
						/* webpackChunkName: "dashboard" */
						'../views/Dashboard.vue'
					),
			},
			{
				path: '/setting',
				name: 'setting',
				meta: {
					title: '系统设置',
				},
				component: () =>
					import(
						/* webpackChunkName: "dashboard" */
						'../views/Setting.vue'
					),
			},
			{
				path: '/threeD',
				name: 'threeD',
				meta: {
					title: '3D',
				},
				component: () =>
					import(
						/* webpackChunkName: "dashboard" */
						'../views/ThreeD.vue'
					),
			},
		]
	},
	{
		path:'/weather',
		name:'weather',
		component:Weather
	}
]

const router = createRouter({
	history: createWebHistory(''),
	routes,
})


export default router
