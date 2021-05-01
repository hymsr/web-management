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
    prefix: '/goods',
    name: '商品管理',
    icon: <ShareAltOutlined />,
    path: '/goods',
    component: React.lazy(() => import('@/page/goods')),
    routes: [
      {
        prefix: '/goods/center',
        name: '商品管理',
        icon: <ShareAltOutlined />,
        path: '/goods/center',
        component: React.lazy(() => import('@/page/goods/center')),
        routes: [
          {
            prefix: '/goods/center/detail/:goodsId',
            name: '商品详情',
            icon: <ShareAltOutlined />,
            path: '/goods/center/detail/:goodsId',
            component: React.lazy(() => import('@/page/goods/center/detail')),
          },
          {
            prefix: '/goods/center/market',
            name: '商品列表',
            icon: <ShareAltOutlined />,
            path: '/goods/center',
            component: React.lazy(() => import('@/page/goods/center/market')),
          },
          {
            path: '/goods/center',
            exact: true,
            render() {
              return <Redirect to={'/goods/center/market'}/>;
            },
          },
        ],
      },
      {
        path: '/goods',
        exact: true,
        render() {
          return <Redirect to={'/goods/center/market'}/>;
        },
      },
      {
        prefix: '/goods/create',
        name: '商品创建',
        icon: <ShareAltOutlined />,
        path: '/goods/create',
        component: React.lazy(() => import('@/page/goods/create')),
      },
    ],
  },
  {
    prefix: '/order',
    name: '订单',
    icon: <ShareAltOutlined />,
    path: '/order',
    component: React.lazy(() => import('@/page/order')),
    routes: [
      {
        prefix: '/order/manager',
        name: '订单管理',
        icon: <ShareAltOutlined />,
        path: '/order/manager',
        component: React.lazy(() => import('@/page/order/manager')),
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
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    routes: [
      ...sliderRoutes,
    ],
  },
];

export default routes;
