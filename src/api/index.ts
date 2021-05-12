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
  getGoodsItem(data): Promise<any> {
    return backendReq({
      url: `/commodity/${data.id}`,
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
  deliverGoods(data): Promise<any> {
    return backendReq({
      url: `/order/${data.orderId}`,
      method: 'put',
    });
  },
  createAd(data): Promise<any> {
    return backendReq({
      data,
      url: `/advertisement`,
      method: 'post',
    });
  },
  updateAd(data): Promise<any> {
    return backendReq({
      data,
      url: `/advertisement`,
      method: 'put',
    });
  },
  getAdList(params): Promise<any> {
    return backendReq({
      params,
      url: `/advertisement`,
      method: 'get',
    });
  },
  getAd(params): Promise<any> {
    return backendReq({
      params,
      url: `/advertisement/${params.id}`,
      method: 'get',
    });
  },
  createSche(data): Promise<any> {
    return backendReq({
      data,
      url: `/advertisementScheduling`,
      method: 'post',
    });
  },
  updateSche(data): Promise<any> {
    return backendReq({
      data,
      url: `/advertisementScheduling`,
      method: 'put',
    });
  },
  queryBlock(params): Promise<any> {
    return backendReq({
      params,
      url: `/block`,
      method: 'get',
    });
  },
};

export default api;
