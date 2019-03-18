import Vue from 'vue'
import Router from 'vue-router'
import GeweiLogin from '@/views/GeweiLogin'
import GeweiHome from '@/views/GeweiHome'

import GeweiSummary from '@/views/sub-views/GeweiSummary'

import GeweiUser from '@/views/sub-views/GeweiUser'
import GeweiRole from '@/views/sub-views/GeweiRole'
import GeweiPrivilege from '@/views/sub-views/GeweiPrivilege'
import GeweiMenu from '@/views/sub-views/GeweiMenu'
import GeweiLanguage from '@/views/sub-views/GeweiLanguage'

import GeweiPersonUpdate from '@/views/sub-views/GeweiPersonUpdate'
import GeweiPersonPass from '@/views/sub-views/GeweiPersonPass'
import GeweiSuggestion from '@/views/sub-views/GeweiSuggestion'

import cs001 from '@/views/cs001'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GeweiLogin',
      component: GeweiLogin
    },
    {
      path: '/GeweiHome',
      name: 'GeweiHome',
      component: GeweiHome,
      redirect: '/GeweiHome/GeweiSummary',
      children: [{
        path: 'GeweiSummary',
        name: 'GeweiSummary',
        component: GeweiSummary
      }, {
        path: 'GeweiUser',
        name: 'GeweiUser',
        component: GeweiUser
      }, {
        path: 'GeweiRole',
        name: 'GeweiRole',
        component: GeweiRole
      }, {
        path: 'GeweiPrivilege',
        name: 'GeweiPrivilege',
        component: GeweiPrivilege
      }, {
        path: 'GeweiMenu',
        name: 'GeweiMenu',
        component: GeweiMenu
      }, {
        path: 'GeweiLanguage',
        name: 'GeweiLanguage',
        component: GeweiLanguage
      }, {
        path: 'GeweiPersonUpdate',
        name: 'GeweiPersonUpdate',
        component: GeweiPersonUpdate
      }, {
        path: 'GeweiPersonPass',
        name: 'GeweiPersonPass',
        component: GeweiPersonPass
      }, {
        path: 'GeweiSuggestion',
        name: 'GeweiSuggestion',
        component: GeweiSuggestion
      }]
    },
    {
      path: '/cs001',
      name: 'cs001',
      component: cs001
    }
  ]
})
