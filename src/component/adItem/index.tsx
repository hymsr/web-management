import React from 'react';
import { Card, Tooltip } from 'antd';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import history from '@/util/history';
import styles from './index.module.less';

const AdItem = ({ adItem, newSche }) => {

  return (
    <div className={styles['plugin-item-card']}>
      <Card
        title={<div className="flex-x-between">
          {adItem?.keyword}
        </div>}
        actions={[
          <EditOutlined key="edit" onClick={() => history.push(`/Ad/center/detail/${adItem.id}`)}/>,
          <PlusSquareOutlined key="new" onClick={newSche}/>
        ]}
      >
        <div className={styles['card-content']}>
          <Tooltip key="com" className={styles.desc} title={adItem.company}>公司: {adItem.company}</Tooltip>
          <Tooltip key="keyword" className={styles.desc} title={adItem.keyword}>关键词: {adItem.keyword}</Tooltip>
          <Tooltip key="inventory" className={styles.desc} title={adItem.url}>视频链接: {adItem.url}</Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default AdItem;
