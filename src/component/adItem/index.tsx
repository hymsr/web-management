import React from 'react';
import { Card, Badge, Tooltip, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import history from '@/util/history';
import styles from './index.module.less';
import api from '@/api';

const AdItem = ({ goodsItem, proxyRefresh }) => {

  const handleItemStatus = (status) => {
    if (status === 0) return 'success';
    if (status === 1) return 'error';
  };

  const destroyAll = () => {

  }

  const forSale = ['上架', '下架']

  return (
    <div className={styles['plugin-item-card']}>
      <Card
        title={<div className="flex-x-between">
          {goodsItem?.name}
          <Badge
            status={handleItemStatus(goodsItem.isForSale)}
            text={forSale[goodsItem.isForSale]}
          />
        </div>}
        actions={[
          <EditOutlined key="edit" onClick={() => history.push(`/goods/center/detail/${goodsItem.id}`)}/>,
        ]}
      >
        <div className={styles['card-content']}>
          <img src={goodsItem.image} alt="avatar" style={{ width: '100%' }} />
          <Tooltip key="needScores" className={styles.desc} title={goodsItem.needScores}>所需积分: {goodsItem.needScores}</Tooltip>
          <Tooltip key="inventory" className={styles.desc} title={goodsItem.inventory}>库存: {goodsItem.inventory}</Tooltip>
        </div>
      </Card>
    </div>
  );
};

export default AdItem;
