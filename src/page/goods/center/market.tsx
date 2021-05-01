import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Form, Button, Pagination, Input, Select } from 'antd';
import styles from './index.module.less';
import history from '@/util/history';
import Goods from '@/component/goods';

export default function PluginMarket() {
  const [form] = Form.useForm();
  const [goodsList, setGoodsList] = useState<any>([
    {
      name: '1',
      needScores: 1,
      inventory: 20,
      isForSale: 0,
    }
  ]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [init, setInit] = useState(false);

  const submit = () => {
    form.getFieldsValue();
    api.getAllGoods().then((res) => {
      setGoodsList(res.items);
      setTotal(res.total);
    });
  };

  useEffect(() => {
    if (init) return;

    // api.queryPluginList({
    //   page: 1,
    //   pageSize,
    // }).then((res) => {
    //   setPluginList(res.items);
    //   setTotal(res.total);
    // })
    //   .finally(() => {
    //     setInit(true);
    //   });
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles['left-part']}>
            <Form form={form} layout="inline">
              <Form.Item label="插件名" name="name">
                <Input placeholder="模糊搜索"/>
              </Form.Item>
              <Form.Item
                label="上架状态"
                name="isForSale"
                initialValue={0}
              >
                <Select
                  style={{ width: 120 }}
                  placeholder="全部"
                  options={[
                    { label: '全部', value: -1 },
                    { label: '上架', value: 0 },
                    { label: '下架', value: 1 },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={submit}>
                  查询
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={styles['right-part']}>
            <Button type="primary" onClick={() => history.push('/goods/create')}>
              新建商品
            </Button>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles['plugin-block']}>
            {
              goodsList?.map(goods => <Goods key={goods.pluginId} goodsItem={goods}/>)
            }
          </div>
          <div className={styles['pagination-wrapper']}>
            <Pagination
              showSizeChanger={total > 10}
              className={styles.pagination}
              current={page}
              pageSize={pageSize}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize || 9);
              }}
              total={total}
              pageSizeOptions={['10', '20']}
            />
          </div>
        </div>
      </div>
    </>
  );
}
