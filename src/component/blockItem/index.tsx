import React from 'react';
import { Card, Tooltip } from 'antd';
import styles from './index.module.less';
import moment from 'moment';

const BlockItem = ({ blockItem }) => {

  return (
    <div className={styles['plugin-item-card']}>
      <Card
        title={<div className="flex-x-between">
          {moment(blockItem?.timestamp).format()}
        </div>}
      >
        <div className={styles['card-content']}>
          <Tooltip key="id" className={styles.desc} title={blockItem.id}>id: {blockItem.id}</Tooltip>
          <Tooltip key="openid" className={styles.desc} title={blockItem.openid}>openid: {blockItem.openid}</Tooltip>
          <Tooltip key="keyword" className={styles.desc} title={blockItem.keyword}>关键词: {blockItem.keyword}</Tooltip>
          <Tooltip key="url" className={styles.desc} title={blockItem.image}>url: {blockItem.image}</Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default BlockItem;
