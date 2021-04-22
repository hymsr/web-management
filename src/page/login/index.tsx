import React from 'react';
import { Form, Input, Button} from 'antd';
import api from '@/api';

export default function Login() {
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
                api.adminLogin({
                  ...data
                }).then(res => {
                  console.log(res);
                });
              }}
            >登录</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
