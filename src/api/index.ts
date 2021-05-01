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
  getGoods(data = {
    page_index: 1,
    page_size: -1,
  }): Promise<any> {
    return backendReq({
      data: {
        isForSale: -1,
        ...data,
      },
      url: `/commodity/all/${data.page_index}/${data.page_size}`,
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
};

export default api;
