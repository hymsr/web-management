import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Form, Select, Button, Input, DatePicker, Skeleton } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import api from '@/api';

import styles from './index.module.less';

function Manager() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [init, setInit] = useState(false);
  const [orderList, setOrderList] = useState<any>();
  const [searchParams, setSearchParams] = useState<any>(() => {
    const t = moment(new Date());
    return {
      isSent: -1,
    };
  });
  const [loading, setLoading] = useState(true);

  const submit = () => {
    setSearchParams(form.getFieldsValue());
    setPage(1);
    setInit(false);
  };

  useEffect(() => {
    if (init) return;
    setLoading(true);

    api.getOrderList({
      openid: searchParams.openid,
      isSent: searchParams.isSent,
      page_index: page,
      page_size: pageSize,
      begin: searchParams?.time?.[0]?.valueOf(),
      end: searchParams?.time?.[1]?.valueOf(),
    }).then((res) => {
      setOrderList(res.orderList);
      setTotal(res.total);
    }).finally(() => {
      setInit(true);
      setLoading(false);
    });

  }, [init, page, pageSize]);

  const [form] = Form.useForm();
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles['left-part']}>
          <Form form={form} layout="inline">
            <Form.Item label="用户id" name="openid">
              <Input placeholder="模糊搜索"/>
            </Form.Item>
            <Form.Item label="时间范围" name="time">
              <DatePicker.RangePicker 
                showTime
              />
            </Form.Item>
            <Form.Item
              label="订单状态"
              name="isSent"
              initialValue={0}
            >
              <Select
                style={{ width: 120 }}
                placeholder="全部"
                options={[
                  { label: '全部', value: -1 },
                  { label: '未发货', value: 0 },
                  { label: '已发货', value: 1 },
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
        </div>
      </div>
      <Skeleton loading={loading} active>
        <Table/>
      </Skeleton>
      
    </div>
  );
}

export default Manager;
