import React, { useEffect, useState } from 'react';
import api from '@/api';
import { Form, Button, Pagination, Input, Modal, Skeleton, DatePicker, message } from 'antd';
import styles from './index.module.less';
import history from '@/util/history';
import AdItem from '@/component/adItem';

export const CreateScheModal = (props) => {
  const { visible, setVisible, ad, sche = null } = props;

  const [date, setDate] = useState<any>();

  useEffect(() => {
    if(!visible) return;
  }, [visible]);

  const create = () => {
    api.createSche({
      advertisementId: ad.id,
      startTime: date[0].valueof(),
      endTime: date[1].valueof(),
    }).then(() => {
      message.success('创建成功');
      setVisible(false);
    });
  };

  const update = () => {
    api.updateSche({
      id: sche.id,
      advertisementId: ad.id,
      startTime: date[0].valueof(),
      endTime: date[1].valueof(),
    }).then(() => {
      message.success('创建成功');
      setVisible(false);
    });
  };

  return (
    <Modal
      visible={visible}
      onOk={sche ? create : update}
    >
      <Form>
        <Form.Item label="公司">
          {ad?.company}
        </Form.Item>
        <Form.Item label="关键词">
          {ad?.keyword}
        </Form.Item>
        <Form.Item label="排期">
          <DatePicker.RangePicker 
            showTime
            value={date}
            onChange={e => {
              setDate(e);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default function AdManager() {
  const [form] = Form.useForm();
  const [adList, setAdList] = useState<any>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [init, setInit] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(() => ({
    name: '',
    isForSale: -1,
  }));
  const [loading, setLoading] = useState(true);
  const [scheModalVisible, setScheModalVisible] = useState(false);
  const [preScheAd, setPreScheAd] = useState();

  const submit = () => {
    setSearchParams(form.getFieldsValue());
    setPage(1);
    setInit(false);
  };

  useEffect(() => {
    if (init) return;
    setLoading(true);

    api.getAdList({
      ...searchParams,
      page_index: page,
      page_size: pageSize,
    }).then((res) => {
      setAdList(res.advertisement);
      setTotal(res.total);
    }).finally(() => {
      setInit(true);
      setLoading(false);
    });

  }, [init, page, pageSize]);

  const newSche = () => {

  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles['left-part']}>
            <Form form={form} layout="inline">
              <Form.Item label="公司" name="company">
                <Input placeholder="模糊搜索"/>
              </Form.Item>
              <Form.Item
                label="关键词"
                name="keyword"
              >
                <Input placeholder="模糊搜索"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={submit}>
                  查询
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={styles['right-part']}>
            <Button type="primary" onClick={() => history.push('/Ad/create')}>
              新建广告
            </Button>
          </div>
        </div>
        <div className={styles.body}>
          <Skeleton loading={loading} active>
            <div className={styles['plugin-block']}>
              {
                adList?.map(ad => <AdItem 
                  key={ad.id} 
                  adItem={ad}
                  newSche={() => {
                    setPreScheAd(ad);
                    setScheModalVisible(true);
                  }}
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
      <CreateScheModal
        visible={scheModalVisible}
        setVisible={setScheModalVisible}
        ad={preScheAd}
      />
    </>
  );
}
