import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './style/global.less';

// 开发模式下，开启热更新
if (module.hot) {
  module.hot.accept();
}

function render(props?) {
  ReactDOM.render(
    <App {...props} />,
    props?.container
      ? props.container.querySelector('#app')
      : document.querySelector('#app'),
  );
}

render();


