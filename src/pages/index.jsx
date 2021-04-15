import React from 'react';
import { Input, Form } from 'antd';

export default function Home(props) {
  return(
    <div>
      <Form
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
      </Form>
    </div>
  );
}