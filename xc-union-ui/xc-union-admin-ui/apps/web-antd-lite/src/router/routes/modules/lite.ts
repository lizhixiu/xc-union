import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'tdesign:system-setting',
      order: 1000,
      title: '基础模块',
    },
    name: '基础模块',
    path: '/lite',
    children: [
      {
        name: 'org',
        path: '/lite/org',
        meta: {
          icon: 'charm:organisation',
          keepAlive: true,
          title: '组织机构',
        },
        children: [
          {
            name: 'liteOrgTvList',
            path: '/lite/org/liteOrg/liteOrgTvList',
            component: () => import('#/views/lite/org/liteOrg/liteOrgTvList.vue'),
            meta: {
              icon: 'mingcute:department-line',
              keepAlive: true,
              title: '机构管理',
            },
          },
          {
            name: 'liteDeptTvList',
            path: '/lite/dept/liteDept/liteDeptTvList',
            component: () => import('#/views/lite/dept/liteDept/liteDeptTvList.vue'),
            meta: {
              icon: 'ant-design:team-outlined',
              keepAlive: true,
              title: '部门管理',
            },
          },
          {
            name: 'litePostTvList',
            path: '/lite/post/litePost/litePostTvList',
            component: () => import('#/views/lite/post/litePost/litePostTvList.vue'),
            meta: {
              icon: 'icon-park-outline:appointment',
              keepAlive: true,
              title: '岗位管理',
            },
          },
          {
            name: 'liteUserTvList',
            path: '/lite/user/liteUser/liteUserTvList',
            component: () => import('#/views/lite/user/liteUser/liteUserTvList.vue'),
            meta: {
              icon: 'ant-design:user-outlined',
              keepAlive: true,
              title: '用户管理',
            },
          },
        ],
      },
      {
        name: 'logs',
        path: '/lite/log',
        meta: {
          icon: 'ant-design:file-text-outlined',
          keepAlive: true,
          title: '日志管理',
        },
        children: [
          {
            name: 'liteLogLoginTvList',
            path: '/lite/log/liteLogLogin/liteLogLoginTvList',
            component: () => import('#/views/lite/log/liteLogLogin/liteLogLoginTvList.vue'),
            meta: {
              icon: 'ant-design:login-outlined',
              keepAlive: true,
              title: '登录日志',
            },
          },
          {
            name: 'liteLogOperTvList',
            path: '/lite/log/liteLogOper/liteLogOperTvList',
            component: () => import('#/views/lite/log/liteLogOper/liteLogOperTvList.vue'),
            meta: {
              icon: 'ant-design:edit-outlined',
              keepAlive: true,
              title: '操作日志',
            },
          },
        ],
      },
      {
        name: 'settings',
        path: '/lite/settings',
        meta: {
          icon: 'ant-design:setting-outlined',
          keepAlive: true,
          title: '配置管理',
        },
        children: [
          {
            name: 'liteNavTvList',
            path: '/lite/nav/liteNav/liteNavTvList',
            component: () => import('#/views/lite/nav/liteNav/liteNavTvList.vue'),
            meta: {
              icon: 'ri:menu-fold-2-fill',
              keepAlive: true,
              title: '导航管理',
            },
          },
          {
            name: 'liteParaClassTvList',
            path: '/lite/para/liteParaClass/liteParaClassTvList',
            component: () => import('#/views/lite/para/liteParaClass/liteParaClassTvList.vue'),
            meta: {
              icon: 'icon-park-outline:reverse-operation-in',
              keepAlive: true,
              title: '参数分类管理',
            },
          },
          {
            name: 'liteParaTvList',
            path: '/lite/para/litePara/liteParaTvList',
            component: () => import('#/views/lite/para/litePara/liteParaTvList.vue'),
            meta: {
              icon: 'fluent-mdl2:dictionary',
              keepAlive: true,
              title: '参数管理',
            },
          },
          {
            name: 'liteConfigTvList',
            path: '/lite/config/liteConfig/liteConfigTvList',
            component: () =>
              import('#/views/lite/config/liteConfig/liteConfigTvList.vue'),
            meta: {
              icon: 'ant-design:tool-outlined',
              keepAlive: true,
              title: '配置中心',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
