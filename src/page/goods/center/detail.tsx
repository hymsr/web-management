import api from '@/api';
import { userReady } from '@/store';
import { Tabs, Form, Divider, Button, Input, message } from 'antd';
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
    // api.updatePlugin({
    //   id: pluginDetail?.pluginId as string,
    //   user: await userReady,
    //   item: {
    //     ...pluginDetail,
    //     ...form.getFieldsValue(),
    //   },
    // }).then(() => {
    //   message.success('更新成功');
    // });
  };

  return (
    <div >
      <Tabs>
        <TabPane tab="商品基本信息" key="1">
          <Form
            form={form}
            wrapperCol={{ span: 13 }}
            labelCol={{ span: 2 }}
            onFinish={update}
          >
            <Form.Item label="商品名">
              {goodsDetail?.name}
            </Form.Item>
            <Form.Item label="所需积分" name="needScores">
              {goodsDetail?.needScores}
            </Form.Item>
            <Form.Item label="库存" name="inventory">
              {goodsDetail?.inventory}
            </Form.Item>
            <Form.Item label="上架状态" name="isForSale">
              {goodsDetail?.isForSale}
            </Form.Item>
            <Divider/>
            <Button type="primary" onClick={form.submit}>更新</Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}
