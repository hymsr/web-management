import React from 'react';
import { Input, Form, Button } from 'antd';
import history from 'utils/history';
import api from 'api';

import './index.less';

export default function Home() {

  const [form] = Form.useForm();
  return(
    <div className="wholePage">
      <div className="login">
        <div className="login-head">
          管理员登录
        </div>
        <div className="login-form">
          <Form
            form={form}
          >
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
            <Button
              type="primary"
              onClick={() => {
                const data = form.getFieldsValue(true);
                api.adminLogin({...data}).then(res => {
                  history.push('/home');
                });
              }}
            >登录</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}