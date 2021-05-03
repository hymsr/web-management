import React, { useState } from 'react';
import { Form, Input, Button, Upload, Divider, InputNumber, message } from 'antd';
import history from '@/util/history';
import api from '@/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const CreateAd = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if(info.file.response.ret === 0) {
        setImageUrl(info.file.response.url);
      } else {
        message.error(`上传失败: ${info.file.response.msg}`);
      }
      setLoading(false);
    }
  };

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
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://www.liiux.cn:8080/image/commodity"
            method="post"
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
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

export default CreateAd;
