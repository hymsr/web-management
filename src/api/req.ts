import axios, { Method } from 'axios';
import { message } from 'antd';
import baseConf from '../../config/base';

const commonConf = {
  // 自定义headers
  headers: {},
  withCredentials: true,
};

// 发往统一后台的请求
export const backendReq = ({
  url,
  data,
  params,
  method = 'get',
  silent = false,
}: {
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  silent?: boolean;
}): Promise<any> => axios.request({
  url,
  // 业务统一后台的请求地址
  baseURL: `${baseConf.reqNameSpace.api}`,
  data,
  params,
  method,
  timeout: 10000,
  ...commonConf,
})
  .then((response) => {
    if (response.data.ret === 0) return response.data;
    message.error(response.data.msg);
    throw response.data.msg;
  })
  .catch((err) => {
    // 统一提示err后，继续把err往业务层抛出，供业务层处理
    if (!silent) {
      message.error(String(err));
    }

    throw err;
  });

// 发往node接入层的req
export const portalReq = ({
  url,
  data,
  params,
  method = 'get',
  silent = false,
}: {
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  silent?: boolean;
}): Promise<any> => axios.request({
  url,
  baseURL: baseConf.reqNameSpace.portal,
  data,
  params,
  method,
  ...commonConf,
  timeout: 5000,
})
  .then((res) => {
    const { data } = res;

    return data;
  })
  .catch((err) => {
    if (!silent) {
      message.error(String(err));
    }

    throw err;
  });

