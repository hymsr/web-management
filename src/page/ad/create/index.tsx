import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Form, Input, Button, Divider, InputNumber, message, Tag } from 'antd';
import history from '@/util/history';
import api from '@/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { chooseFile } from'@/util';
import upload from'@/util/cos';

import styles from './index.module.less';

const CreatePlugin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>();

  const submit = () => {
    api.createAd({
      url: videoUrl,
      ...form.getFieldsValue(),
    }).then(() => {
      message.success('创建成功');
      history.push('/Ad/center');
    });
  };

  const uploadFile = async() => {
    const fileSrc = await chooseFile();
    setLoading(true);
    upload.upload(...fileSrc).then(res => {
      setVideoUrl(`http://${res.Location}`);
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
        <Form.Item label="公司名称" name="company"
          rules={[
            {
              required: true,
              message: '请输入公司名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="关键词" name="keyword"
          rules={[
            {
              required: true,
              message: '请输入广告关键词',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item label="视频">
          {videoUrl ? <ReactPlayer url={videoUrl} className='react-player'
            playing style={{ width: '100%' }} /> : uploadButton}
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
