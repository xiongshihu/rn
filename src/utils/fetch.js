'use strict';

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @returns {Promise}
 */
export function R_GET(url, params) {
  if (params) {
    let paramsArray = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return new Promise(function (resolve, reject) {
    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
    })
    .then((response) => {
        if (response && response.error_code === 0) {
            resolve(response) // response.error_code 是与服务器端的约定，非0就是错误
        } else {
            reject(response.message) // response.message也是与服务器端的约定，error_code !==0 就需要返回message
        }
    })
    .catch((err)=> {
        reject(_parseErrorMsg(err))
    })
  });
}

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @returns {Promise}
 */
export function R_POST(url, params) {
  return new Promise(function (resolve, reject) {
    fetch('http://nero-zou.com/test', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
    })
    .then((response) => {
        if (response && response.error_code === 0) {
            resolve(response) // response.error_code 是与服务器端的约定，非0就是错误
        } else {
            reject(response.message) // response.message也是与服务器端的约定，error_code !==0 就需要返回message
        }
    })
    .catch((err)=> {
        reject(_parseErrorMsg(err))
    })
  });
}

function createCatFetchMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    const { catFetch, catMethod = 'GET' } = action;
    if (catFetch && catMethod) {
      if (catMethod === 'GET') {
        return R_GET();
      }
      if (catMethod === 'POST') {
        return R_POST();
      }
    }
    return next(action);
  };
}

const catFetch = createCatFetchMiddleware();
catFetch.withExtraArgument = createFetchMiddleware;

export default catFetch;
