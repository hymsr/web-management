import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';

export default function WithStore(Component, stores = {}) {
  const Observable = observer(Component);

  const Wrapper = props => <Observable {...props} store={store} {...stores}/>;

  return Wrapper;
}
