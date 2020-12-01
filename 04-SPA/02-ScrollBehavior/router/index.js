import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  console.log('to', to);
  console.log('from', from);
  console.log('savedPosition', savedPosition);
  let position;
  if (savedPosition) {
    position = savedPosition;
  } else if (to.hash) {
    position = {
      selector: to.hash,
    };
  } else if (from.meta.saveScrollPosition && to.meta.saveScrollPosition) {
    position = false;
  } else if (to.meta.saveScrollPosition) {
    position = { x: 0, y: 0 };
  } else {
    return { x: 0, y: 0 };
  }
  return position; //new Promise((resolve) => setTimeout(() => resolve(position), 500)); //без промиса не работает
}

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/02-ScrollBehavior',

  scrollBehavior,

  routes: [
    {
      path: '/',
      name: 'index',
      // alias: 'meeetups'
      // redirect: '/meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
