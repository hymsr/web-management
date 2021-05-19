import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { Form, Button, Input, DatePicker, Skeleton, Pagination, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import api from '@/api';
import { CreateScheModal } from '@/page/ad/manager';

import styles from './index.module.less';

function Manager() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [init, setInit] = useState(false);
  const [scheList, setScheList] = useState<any>();
  const [date, setDate] = useState<any>();
  const [searchParams, setSearchParams] = useState<any>(() => {});
  const [loading, setLoading] = useState(true);
  const [scheModalVisible, setScheModalVisible] = useState(false);
  const [preScheAd, setPreScheAd] = useState();
  const [onOpSche, setOpSche] = useState();

  const submit = () => {
    setSearchParams(form.getFieldsValue());
    setPage(1);
    setInit(false);
  };

  useEffect(() => {
    if (init) return;
    setLoading(true);

    api.getOrderList({
      page_index: page,
      page_size: pageSize,
      begin: date?.[0].valueOf(),
      end: date?.[1].valueOf(),
      ...searchParams,
    }).then((res) => {
      setScheList(res.advertisementScheduling);
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
            <Form.Item label="公司" name="company">
              <Input placeholder="模糊搜索"/>
            </Form.Item>
            <Form.Item label="关键字" name="keyword">
              <Input placeholder="模糊搜索"/>
            </Form.Item>
            <Form.Item label="时间范围">
              <DatePicker.RangePicker 
                showTime
                value={date}
                onChange={e => {
                  setDate(e);
                }}
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
                key: 'startTime',
                title: '开始时间',
                render(record) {
                  return (
                    <>
                      {moment.unix(record.startTime/1000).format('YYYY-MM-DD HH:mm:ss')}
                    </>
                  );
                }
              },
              {
                key: 'endTime',
                title: '结束时间',
                render(record) {
                  return (
                    <>
                      {moment.unix(record.endTime/1000).format('YYYY-MM-DD HH:mm:ss')}
                    </>
                  );
                }
              },
              {
                key: 'ad',
                title: '广告信息',
                render(record) {
                  return (
                    <>
                    公司：{record.advertisement.company}<br/>
                    关键词：{record.advertisement.keyword}<br/>
                    </>
                  );
                }
              },
              {
                key: 'op',
                title: '操作',
                render(record) {
                  return <>
                    <Button type="link" onClick={() => {
                      setPreScheAd(record.advertisement);
                      setOpSche(record.advertisementScheduling);
                    }}>
                      修改
                    </Button>
                    <Button type="link" onClick={() => {
                      api.deleteSche({
                        id: record.id,
                      }).then(() => {
                        message.success('删除成功');
                      });
                    }}>
                      删除
                    </Button>
                  </>;
                }
              },
            ]}
            dataSource={scheList}
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
      <CreateScheModal 
        ad={preScheAd}
        visible={scheModalVisible}
        setVisible={setScheModalVisible}
        sche={onOpSche}

      />
    </div>
  );
}

export default Manager;
