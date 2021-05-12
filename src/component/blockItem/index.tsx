import React from 'react';
import { Card, Tooltip } from 'antd';
import styles from './index.module.less';

const BlockItem = ({ blockItem }) => {

  return (
    <div className={styles['plugin-item-card']}>
      <Card
        title={<div className="flex-x-between">
          {blockItem?.timestamp}
        </div>}
      >
        <div className={styles['card-content']}>
          <Tooltip key="id" className={styles.desc} title={blockItem.id}>id: {blockItem.id}</Tooltip>
          <Tooltip key="openid" className={styles.desc} title={blockItem.openid}>openid: {blockItem.openid}</Tooltip>
          <Tooltip key="keyword" className={styles.desc} title={blockItem.keyword}>关键词: {blockItem.keyword}</Tooltip>
          <div className={styles.desc}><img src={blockItem.image}/></div>
        </div>
      </Card>
    </div>
  );
};

export default BlockItem;
