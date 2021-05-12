import React, { useState } from 'react';
import { Form, Input, Button, Divider, InputNumber, message } from 'antd';
import history from '@/util/history';
import api from '@/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { chooseFile } from'@/util';
import upload from'@/util/cos';

import styles from './index.module.less';

const CreatePlugin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const submit = () => {
    api.createGood({
      image: imageUrl,
      isForSale: 0,
      ...form.getFieldsValue(),
    }).then(() => {
      message.success('创建成功');
      history.push('/plugin/center');
    });
  };

  const uploadFile = async() => {
    const fileSrc = await chooseFile();
    setLoading(true);
    upload.upload(...fileSrc).then(res => {
      setImageUrl(`http://${res.Location}`);
    }).finally(() => {
      setLoading(false);
    });
  };

  const uploadButton = (
    <div className={styles.upload} onClick={() => uploadFile()}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 5 }}
        onFinish={submit}
      >
        信息
        <Divider/>
        <Form.Item label="商品名称" name="name"
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="所需积分" name="needScores"
          rules={[
            {
              required: true,
              message: '请输入商品所需积分',
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item label="图片">
          {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}
        </Form.Item>
        <Form.Item label="库存" name="inventory"
          rules={[
            {
              required: true,
              message: '请输入库存',
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Divider/>
        <Button 
          type="primary"
          onClick={form.submit}
        >创建</Button>
      </Form>
    </div>
  );
};

export default CreatePlugin;
