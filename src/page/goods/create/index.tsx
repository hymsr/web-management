import React, { useState } from 'react';
import { Form, Input, Button, Upload, Divider, InputNumber } from 'antd';
import history from '@/util/history';
import api from '@/api';
import WithStore from '@/component/with-store';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const CreatePlugin = WithStore(({ store }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const submit = () => {
    // api.createPlugin({
    //   user: store.user,
    //   item: {
    //     ...form.getFieldsValue(),
    //   },
    // }).then(() => {
    //   message.success('创建成功');
    //   history.push('/plugin/center');
    // });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const  getBase64 = (img, callback) =>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        {
          setLoading(false);
          setImageUrl(imageUrl);
        }
      );
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
        <Form.Item label="所需积分" name="needScore"
          rules={[
            {
              required: true,
              message: '请输入商品所需积分',
            },
          ]}
        >
          <InputNumber/>
        </Form.Item>
        <Form.Item label="图片">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://www.liiux.cn:8080/image"
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
          <InputNumber/>
        </Form.Item>
        <Divider/>
        <Button type="primary" onClick={form.submit}>创建</Button>
      </Form>
    </div>
  );
});

export default CreatePlugin;
