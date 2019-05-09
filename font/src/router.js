import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Stop from './views/Stop.vue';
import Index from './views/Index.vue';
import Api from './views/Api.vue';
import ApiDetail from './views/ApiDetail.vue';
import Compass from './views/Compass.vue';
import CompassDetail from './views/CompassDetail.vue';
import { getToken, setToken } from './libs/storage';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        iframeEnabled: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/stop',
      name: 'stop',
      component: Stop
    },
    {
      path:'/api',
      name:'api',
      component:Api
    },
    {
      path:'/apidetail/:id',
      name:'apidetail',
      component:ApiDetail
    },
    {
      path:'/index',
      name:'index',
      component:Index
    },{
      path:'/',
      redirect:'/index'
    },
    {
      path:'/compass',
      name:'compass',
      component:Compass
    },
    {
      path:'/compassdetail',
      name:'compassdetail',
      component:CompassDetail
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(path => path.meta.requiresAuth)) {
    var token = getToken();
    if (to.meta.iframeEnabled && to.query.token) {
      if (to.query.token != token) {
        setToken(to.query.token);
        token = to.query.token;
      }
    }
    if (!token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
