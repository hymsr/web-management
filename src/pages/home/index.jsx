import React, { useState } from 'react';
import { Menu, } from 'antd';
import { ShoppingOutlined, SettingOutlined } from '@ant-design/icons';
import history from 'utils/history';

import './index.less';

export default function Home() {
  const [current, setCurrent] = useState();

  return(
    <div>
      <Menu 
        onClick={(e) => {
          setCurrent(e.key);
        }} 
        selectedKeys={[current]} 
        mode="horizontal"
      >
        <Menu.Item key="shopping" icon={<ShoppingOutlined />}>
          商品管理
        </Menu.Item>
        <Menu.SubMenu className="float-right" key="SubMenu" icon={<SettingOutlined />} title="setting">
          <Menu.Item 
            key="exit"
            onClick={() => history.push('/')}
          >退出</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}