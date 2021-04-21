import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import api from '@/api';
import { renderRoutes } from 'react-router-config';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import history from '@/util/history';
import { isLocalEnv } from '@/util';
import WithStore from '../with-store';
import styles from './index.module.less';
import commonStyles from '@/style/common.module.less';
import { sliderRoutes } from '@/router';


const UserMenu = () => (
  <Menu>
    <Menu.Item>
      <a onClick={() => {
        history.push('/page1');
      }}>
          跳转到page1
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item disabled={isLocalEnv()}>
      <a href={`/_logout/?url=${encodeURIComponent(window.location.origin)}`}>
          退出登录
      </a>
    </Menu.Item>
  </Menu>
);

const Header = WithStore(({ store }) => {
  useEffect(() => {
    api.getUser().then((user) => {
      store.setUser(user);
    });
  }, []);

  return (
    <div className="header-wrapper">
      <div className="right">
        <div className="rtx">
          <Dropdown overlay={<UserMenu/>}>
            <span className="cp">
              <span style={{ marginRight: 6 }}>{store.user}</span>
              <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </div>
    </div>
  );
});

const MainLayout = ({ history, location, route }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([location.pathname]);
  const [menuKeys] = useState(() => {
    const menuKeys: string[] = [];
    sliderRoutes.forEach((r) => {
      r.prefix && menuKeys.push(r.prefix);
      r.routes && r.routes.forEach((sr) => {
        sr.prefix && menuKeys.push(sr.prefix);
      });
    });
    return menuKeys;
  });

  // 菜单选中状态响应路由变化
  useEffect(() => {
    setSelectedMenu(menuKeys.filter(key => location.pathname.startsWith(key)));
  }, [location.pathname, menuKeys]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={styles.sider}
      >
        <div className="logo">
          Template
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedMenu}
          onClick={({ key }) => history.push(key)}
          defaultOpenKeys={menuKeys}
        >
          {
            sliderRoutes.map((r) => {
              if (r.routes && r.routes.find(sr => sr.prefix)) {
                return (
                  <Menu.SubMenu key={r.prefix} icon={r.icon} title={r.name}>
                    {
                      r.routes.filter(sr => sr.prefix).map(sr => (
                        <Menu.Item key={sr.prefix} icon={sr.icon}>
                          { sr.name }
                        </Menu.Item>
                      ))
                    }
                  </Menu.SubMenu>
                );
              }

              return (
                <Menu.Item key={r.prefix} icon={r.icon}>
                  { r.name }
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          className={styles.header}
        >
          <Header/>
        </Layout.Header>
        <Layout.Content
          className={commonStyles['page-padding']}
        >
          <React.Suspense fallback={<LoadingOutlined/>}>
            {renderRoutes(route.routes)}
          </React.Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
