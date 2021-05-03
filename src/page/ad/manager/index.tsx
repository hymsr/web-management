import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Form, Button, Pagination, Input, Select, Skeleton } from 'antd';
import styles from './index.module.less';
import history from '@/util/history';
import Goods from '@/component/goods';

export default function GoodsMarket() {
  const [form] = Form.useForm();
  const [goodsList, setGoodsList] = useState<any>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [init, setInit] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(() => ({
    name: '',
    isForSale: -1,
  }));
  const [loading, setLoading] = useState(true);

  const submit = () => {
    setSearchParams(form.getFieldsValue());
    setPage(1);
    setInit(false);
  };

  useEffect(() => {
    if (init) return;
    setLoading(true);

    api.getGoodsList({
      ...searchParams,
      page_index: page,
      page_size: pageSize,
    }).then((res) => {
      setGoodsList(res.commodity);
      setTotal(res.total);
    }).finally(() => {
      setInit(true);
      setLoading(false);
    });

  }, [init, page, pageSize]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles['left-part']}>
            <Form form={form} layout="inline">
              <Form.Item label="商品名" name="name">
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
          <Skeleton loading={loading} active>
            <div className={styles['plugin-block']}>
              {
                goodsList?.map(goods => <Goods 
                  key={goods.pluginId} 
                  goodsItem={goods} 
                  proxyRefresh={() => setInit(false)}
                />)
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
          </Skeleton>
        </div>
      </div>
    </>
  );
}
