import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/picPostDetails/:postId',
      name: 'picPostDetails',
      component: () => import('../views/postViews/picPostDetails.vue'),
      props: true
    },
    {
      path: '/otherHome/:userId',
      name: 'otherHome',
      component: () => import('../views/messageViews/otherHome.vue'),
      props: true
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/messageViews/report.vue'),
    },
    {
      path: '/publishPicPost',
      name: 'publishPicPost',
      component: () => import('../views/postViews/publishPicPost.vue'),
    },
    {
      path: '/aiDetails',
      name: 'aiDetails',
      component: () => import('../views/aiViews/aiDetails.vue'),
    },
    {
      path: '/aiChat',
      name: 'aiChat',
      component: () => import('../views/aiViews/aiChat.vue'),
    },
  ],
})

export default router
