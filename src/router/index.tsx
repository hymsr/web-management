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
    name: '商品',
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
  {
    prefix: '/Ad',
    name: '广告',
    icon: <ShareAltOutlined />,
    path: '/Ad',
    component: React.lazy(() => import('@/page/ad')),
    routes: [
      {
        prefix: '/Ad/manager',
        name: '广告管理',
        icon: <ShareAltOutlined />,
        path: '/Ad/manager',
        component: React.lazy(() => import('@/page/ad/manager')),
        routes:[
          {
            prefix: '/Ad/manager/detail/:AdId',
            name: '广告详情',
            icon: <ShareAltOutlined />,
            path: '/Ad/manager/detail/:AdId',
            component: React.lazy(() => import('@/page/ad/manager/detail')),
          },
        ],
      },
      {
        prefix: '/Ad/schedule',
        name: '排期管理',
        icon: <ShareAltOutlined />,
        path: '/Ad/schedule',
        component: React.lazy(() => import('@/page/ad/schedule')),
      },
      {
        prefix: '/Ad/create',
        name: '广告创建',
        icon: <ShareAltOutlined />,
        path: '/Ad/create',
        component: React.lazy(() => import('@/page/ad/create')),
      },
      {
        path: '/Ad',
        exact: true,
        render() {
          return <Redirect to={'/Ad/manager'}/>;
        },
      },
    ],
  },
  {
    prefix: '/block',
    name: '区块',
    icon: <ShareAltOutlined />,
    path: '/block',
    component: React.lazy(() => import('@/page/block-chain')),
    routes: [
      {
        prefix: '/block/manager',
        name: '区块链查看',
        icon: <ShareAltOutlined />,
        path: '/block/manager',
        component: React.lazy(() => import('@/page/block-chain/detail')),
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
