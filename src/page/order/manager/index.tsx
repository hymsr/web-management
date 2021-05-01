import React from 'react';
import { Table } from 'antd';
import { Form, Select, Button, Input, DatePicker } from 'antd';
import history from '@/util/history';

import styles from './index.module.less';

function Manager() {

  const submit = () => {
    console.log(form.getFieldsValue());
  };

  const [form] = Form.useForm();
  return (
    <div className={styles.main}>
      <div className={styles.header}>
          <div className={styles['left-part']}>
            <Form form={form} layout="inline">
              <Form.Item label="用户名" name="name">
                <Input placeholder="模糊搜索"/>
              </Form.Item>
              <Form.Item label="时间范围" name="time">
                <DatePicker.RangePicker showTime />
              </Form.Item>
              <Form.Item
                label="订单状态"
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
      <Table/>
    </div>
  );
}

export default Manager;
