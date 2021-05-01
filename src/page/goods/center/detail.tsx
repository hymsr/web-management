import api from '@/api';
import { userReady } from '@/store';
import { Tabs, Form, Divider, Button, Input, message, InputNumber, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

const { TabPane } = Tabs;

export default function PluginDetail({ match }) {
  const [goodsDetail, setGoodsDetail] = useState<any>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!match.params.pluginName) return;

    // api.queryPluginDetail({
    //   name: match.params.pluginName,
    // }).then((res) => {
    //   setPluginDetail(res.item);
    //   form.setFieldsValue(res.item);
    // });
  }, [match.params.pluginId]);

  const update = async () => {
    api.updateGood({
      ...goodsDetail,
      ...form.getFieldsValue(),
    }).then(() => {
      message.success('更新成功');
    });
  };

  return (
    <div >
      <Tabs>
        <TabPane tab="商品基本信息" key="1">
          <Form
            form={form}
            wrapperCol={{ span: 13 }}
            labelCol={{ span: 3 }}
            onFinish={update}
          >
            <Form.Item label="商品名">
              {goodsDetail?.name}
            </Form.Item>
            <Form.Item label="所需积分" name="needScores">
              <InputNumber
                min={0}
              />
            </Form.Item>
            <Form.Item label="库存" name="inventory">
              <InputNumber min={0}/>
            </Form.Item>
            <Form.Item label="上架状态" name="isForSale">
              <Radio.Group>
                <Radio value={0}>上架</Radio>
                <Radio value={1}>下架</Radio>
              </Radio.Group>
            </Form.Item>
            <Divider/>
            <Button type="primary" onClick={form.submit}>更新</Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}
