import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router/index';
import { ConfigProvider } from 'antd';
import history from '@/util/history';
import { LoadingOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <React.Suspense fallback={<LoadingOutlined/>}>
          {renderRoutes(routes)}
        </React.Suspense>
      </Router>
    </ConfigProvider>
  );
}
export default App;
