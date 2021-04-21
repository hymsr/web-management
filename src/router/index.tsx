import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from '@/component';
import Login from '@/page/login';
import {
  ShareAltOutlined,
} from '@ant-design/icons';

interface Route {
  // menu渲染用的字段，可选
  prefix?: string;
  name?: string;
  icon?: JSX.Element;
  // react-router字段
  path: string;
  component?: ((props: any) => JSX.Element | null) | JSX.Element;
  render?: (props: any) => JSX.Element;
  routes?: Route[];
  exact?: boolean;
}

export const sliderRoutes: Route[] = [
  {
    prefix: '/home/menu',
    name: '侧栏菜单',
    icon: <ShareAltOutlined />,
    path: '/home/menu',
    component: React.lazy(() => import('@/page/submenu')),
    routes: [
      {
        prefix: '/home/menu/1',
        name: '子菜单1',
        path: '/home/menu/1',
        component: React.lazy(() => import('@/page/submenu/menu1')),
      },
      {
        prefix: '/home/menu/2',
        name: '子菜单2',
        path: '/home/menu/2',
        component: React.lazy(() => import('@/page/submenu/menu2')),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    exact: true,
    render() {
      return <Redirect to={'/login'}/>;
    },
  },
  {
    path: '/home',
    component: Layout,
    routes: [
      ...sliderRoutes,
      {
        path: '/home/page1',
        component: React.lazy(() => import('@/page/page1')),
      },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
];

export default routes;
