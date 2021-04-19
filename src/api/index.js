import axios from 'axios';
import { message } from 'antd';

const baseURL = 'http://www.liiux.cn:8080';

const request = ({ url, data: oData, method = 'get' } = {}) => {
  const data = Object.assign({}, oData);

  return axios
    .request({
      url,
      data,
      method,
      baseURL,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    .then(response => {
      if (response.data.ret === 0) return response.data;
      message.error(response.data.msg);
      throw response.data.msg;
    })
    .catch((err) => {
      message.error(err.message);
      throw err;
    });
}

const api = {
  adminLogin: (data = {}) => {
    return request({
      url: `/admin/${data.token}`,
    });
  },
};

export default api;