import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FindPassword from '@/components/FindPassword'
import Home from '@/components/Home'
import Myinfo from '@/components/Myinfo'
import test from '@/components/test'
import editor from '@/components/editor'
import RecentlyDoc from '@/components/HomePage/RecentlyDoc'
import Model00 from '@/components/Model/Model00'
import Model01 from '@/components/Model/Model01'

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
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
    },
    {
      path: '/RecentlyDoc',
      name: 'RecentlyDoc',
      component: RecentlyDoc
    },
    {
      path: '/Model00',
      name: 'Model00',
      component: Model00
    },
    {
      path: '/Model01',
      name: 'Model01',
      component: Model01
    },
  ]
})
