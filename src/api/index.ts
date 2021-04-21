import { backendReq, portalReq } from './req';

const api = {
  mockRsp<T>(res?: T): Promise<T> {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 600 + 50, res));
  },
  test(): Promise<any> {
    return backendReq({
      url: '/SayHello',
    });
  },
  getUser(): Promise<string> {
    return portalReq({
      url: '/user',
    });
  },
};

export default api;
