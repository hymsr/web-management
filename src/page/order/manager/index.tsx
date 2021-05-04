import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { Form, Select, Button, Input, DatePicker, Skeleton, Pagination } from 'antd';
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
      setOrderList(res.order);
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
      <div className={styles.body}>
      <Skeleton loading={loading} active>
        <Table
          columns={[
            {
              key: 'commodity',
              title: '商品信息',
              render(record) {
                return (
                  <>
                    商品名：{record.commodity.name}<br/>
                    所需积分：{record.commodity.needScores}
                  </>
                );
              }
            },
            {
              key: 'user',
              title: '用户openid',
              render: (record) => record.user.openid,
            },
            {
              key: 'address',
              title: '用户地址',
              render(record) {
                return (
                  <>
                    姓名：{record.address.name}<br/>
                    地址：{record.address.detailAddress}<br/>
                    电话：{record.address.tel}
                  </>
                );
              }
            },
            {
              key: 'status',
              title: '订单状态',
              render: (record) => record.status,
            },
            {
              key: 'time',
              title: '订单产生时间',
              render: (record) => moment.unix(record.time/1000).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
              key: 'operator',
              title: '操作',
              render(record){
                return(
                  <>
                    <Button
                      disabled={record.status === "已发货"}
                      type="link"
                      onClick={() => {
                        api.deliverGoods({
                          orderId: record.id,
                        }).then(() => {
                          message.success('发货成功');
                          setInit(false);
                        });
                      }}
                    >发货</Button>
                  </>
                );
              },
            },
          ]}
          dataSource={orderList}
          loading={loading}
          rowKey={(record) => record.time}
          pagination={false}
        />
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
  );
}

export default Manager;
