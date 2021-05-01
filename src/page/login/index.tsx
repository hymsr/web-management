import React, { useEffect } from 'react';
import { Form, Input, Button} from 'antd';
import api from '@/api';
import history from '@/util/history';
import { set, get } from '@/util/ls';

export default function Login() {
  const [form] = Form.useForm();
  useEffect(() => {
    if (get('isLogin')) {
      history.push('/goods/center');
    };
  }, []);

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
                }).then(() => {
                  set('isLogin', true, 3600);
                  history.push('/goods/center');
                });
              }}
            >登录</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
