import React from 'react';
import { Input, Form } from 'antd';
import './index.less';

export default function Home() {

  return(
    <div className="login">
      <div className="login-head">
        管理员登录
      </div>
      <div className="login-form">
      <Form>
        <Form.Item
          label="账号"
          name="token"
          rules={[
            {
              required: true,
              message: 'Please input admin token!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </div>
    </div>
    
  );
}