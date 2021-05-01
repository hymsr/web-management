import { backendReq, portalReq } from './req';

const api = {
  mockRsp<T>(res?: T): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 600 + 50, res));
  },
  adminLogin(data): Promise<any> {
    return backendReq({
      url: `/admin/${data?.token}`,
    });
  },
  getAllGoods(): Promise<any> {
    return backendReq({
      url: `/commodity/all/1/-1`,
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
};

export default api;
