import { backendReq } from './req';

const api = {
  mockRsp<T>(res?: T): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 600 + 50, res));
  },
  adminLogin(data): Promise<any> {
    return backendReq({
      url: `/admin/${data?.token}`,
    });
  },
  getGoodsList(data): Promise<any> {
    return backendReq({
      params: data,
      url: `/commodity`,
      method: 'get',
    });
  },
  createGood(data: any): Promise<any> {
    return backendReq({
      data,
      url: `/commodity`,
      method: 'POST',
    });
  },
  updateGood(data: any): Promise<any> {
    return backendReq({
      data,
      url: `/commodity`,
      method: 'put',
    });
  },
  getOrderList(params): Promise<any> {
    return backendReq({
      params,
      url: `/order`,
      method: 'get',
    });
  },
};

export default api;
