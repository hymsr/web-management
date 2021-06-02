import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Form, Button, Pagination, DatePicker, Skeleton } from 'antd';
import styles from './index.module.less';
import Block from '@/component/blockItem';

export default function blockChainSearch() {
  const [form] = Form.useForm();
  const [blockList, setBlockList] = useState<any>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [init, setInit] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(() => ({}));
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<any>();

  const submit = () => {
    setSearchParams(form.getFieldsValue());
    setPage(1);
    setInit(false);
  };

  useEffect(() => {
    if (init) return;
    setLoading(true);

    api.queryBlock({
      ...searchParams,
      begin: date?.[0].valueOf(),
      end: date?.[1].valueOf(),
      page_size: 500,
    }).then((res) => {
      setBlockList(res.blockList);
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
            <div className={styles['plugin-block']}>
              {
                blockList?.map(block => <Block 
                  key={block.id} 
                  blockItem={block} 
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
