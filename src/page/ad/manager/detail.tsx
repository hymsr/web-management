import { userReady } from '@/store';
import { Tabs, Form, Divider, Button, Input, message, InputNumber, Radio, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '@/api';
import ReactPlayer from 'react-player';

const { TabPane } = Tabs;

export default function AdDetail({ match }) {
  const [adDetail, setAdDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!match.params.AdId) return;
    setLoading(true);
    api.getAd({
      id: match.params.AdId,
    }).then((res) => {
      setAdDetail(res.advertisement);
      form.setFieldsValue(res.advertisement);
      setLoading(false);
    });
  }, [match.params.goodsId]);

  const update = async () => {
    api.updateAd({
      ...adDetail,
      ...form.getFieldsValue(),
    }).then(() => {
      message.success('更新成功');
    });
  };

  return (
    <div >
      <Tabs>
        <TabPane tab="广告基本信息" key="1">
          <Skeleton active loading={loading}>
            <Form
              form={form}
              wrapperCol={{ span: 13 }}
              labelCol={{ span: 3 }}
              onFinish={update}
            >
              <Form.Item label="广告公司" name="company">
                {adDetail?.company}
              </Form.Item>
              <Form.Item label="广告内容">
                <ReactPlayer
                  url={adDetail.url}
                  controls
                />
              </Form.Item>
              <Form.Item label="广告url" name="url">
                <Input />
              </Form.Item>
              <Form.Item label="广告关键词" name="keyword">
                <Input/>
              </Form.Item>
              <Divider/>
              <Button type="primary" onClick={form.submit}>更新</Button>
            </Form>
          </Skeleton>
        </TabPane>
      </Tabs>
    </div>
  );
}
