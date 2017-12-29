import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Topics from '@/components/Topics'
import Topic from '@/components/Topic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/topics/:pageIndex',
      name: 'Topics',
      component: Topics
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component: Topic,
      props: true
    }
  ]
})
