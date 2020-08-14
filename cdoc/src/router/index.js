import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import FindPassword from '@/components/FindPassword'
import Home from '@/components/Home'
import Myinfo from '@/components/Myinfo'
import test from '@/components/test'
import editor from '@/components/editor'
import mouseClick from '@/components/mouseClick'
import editorPage from "../components/editorPage";

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
      path: '/mouseClick',
      name: 'mouseClick',
      component: mouseClick
    },
  ]
})
