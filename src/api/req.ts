import axios, { Method } from 'axios';
import { message } from 'antd';
import baseConf from '../../config/base';

const commonConf = {
  // 自定义headers
  headers: {},
  withCredentials: true,
};

const EPP_GW_CODE_HEADER = 'epp-gateway-code';
const EPP_GW_MSG_HEADER = 'epp-gateway-msg';
const EPP_GW_CODE_SUCC = '100000';

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
  baseURL: `${baseConf.reqNameSpace.api}/gateway`,
  data,
  params,
  method,
  ...commonConf,
})
  .then((res) => {
    const { data, headers } = res;

    // 统一处理data和headers，例如使用了epp网关的错误逻辑处理
    if (headers[EPP_GW_CODE_HEADER] && headers[EPP_GW_CODE_HEADER] !== EPP_GW_CODE_SUCC) {
      throw new Error(`gateway code not success, code: ${headers[EPP_GW_CODE_HEADER]}, msg: ${headers[EPP_GW_MSG_HEADER]}`);
    }

    // 返回业务数据
    return data.data ? data.data : data;
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

