import VueRouter from 'vue-router';
import URI from 'urijs';

import ListView from '../view/ListView.vue';
import HLSPlayer from '../view/HLSPlayer.vue';
import ChannelList from '../view/ChannelList.vue';
import ProgramList from '../view/ProgramList.vue';

import config from '../../config.json5';

const listRoute = {
  name: 'list',
  path: URI('./list/').absoluteTo(config.baseUrl).toString(),
  props: true,
  component: ListView,
  children: [{
    name: 'channel',
    path: 'channel/:category',
    component: ChannelList,
  }],
};

if (config.epgUrl && config.epgUrl.length) {
  listRoute.children.push({
    name: 'program',
    path: 'program',
    component: ProgramList,
  });
}

const playRoute = {
  name: 'play',
  path: URI('./play/:channel').absoluteTo(config.baseUrl).toString(),
  props: true,
  component: HLSPlayer,
};

const defaultRoute = {
  path: '*',
  redirect: (to) => {
    return {
      name: 'channel',
      params: {
        category: 'UNKNOWN',
      },
    };
  },
};

const routes = [
  listRoute,
  playRoute,
  defaultRoute,
];

export const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  routes,
});

