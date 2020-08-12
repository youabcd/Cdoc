import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FindPassword from '@/components/FindPassword'
import Home from '@/components/Home'
import Myinfo from '@/components/Myinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/FindPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Myinfo',
      name: 'Myinfo',
      component: Myinfo
    },
  ]
})
