import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

interface Query {
  [prop: string]: string | string[];
}
/* eslint-disable no-param-reassign */
export const parseQuery = (oSearch: string, aggKeys: Array<any> = []): Query => {
  const search = String(oSearch).replace(/^\?/, '');
  const query: Query = search.split('&').filter(query => query)
    .reduce((query, piece) => {
      const [prop, value] = piece.split('=');
      query[prop] = decodeURIComponent(value);
      return query;
    }, {});

  if (aggKeys.length) {
    const queryKeys = Object.keys(query);

    aggKeys.forEach((aggKey) => {
      const result: Array<any> = [];

      queryKeys
        .filter(queryKey => new RegExp(`^${aggKey}(_\\d)?`).test(queryKey))
        .forEach((queryKey) => {
          result.push(query[queryKey]);
        });

      query[aggKey] = result;
    });
  }
  return query;
};
/* eslint-enable no-param-reassign */

export const pushQuery = (query: Array<Query>): void => {
  const queryStrArry = Object.keys(query)
    .filter(key => query[key] !== undefined && String(query[key]))
    .map(key => `${key}=${encodeURIComponent(query[key])}`);

  let [url] = window.location.href.split('?');
  if (queryStrArry.length > 0) {
    url += `?${queryStrArry.join('&')}`;
  }

  window.history.pushState({ url, title: document.title }, document.title, url);
};

export default history;
