'use strict';

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @returns {Promise}
 */
function R_GET(url, params = {}, token) {
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
    fetch(url, {
      'credentials': 'include',
      'headers': {
        'Cookie': token
      }
    })
    .then((response) => {
      if (response.ok) {
          return response.json()
      } else {
          reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    })
    .then((response) => {
      if (response) {
          resolve(response)
      } else {
          reject(response.message)
      }
    })
    .catch((err)=> {
      reject(err)
    })
  });
}

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @returns {Promise}
 */
function R_POST(url, params, token) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'post',
      headers: {
        'credentials': 'include',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': token
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
        if (response) {
            resolve(response) // response.error_code 是与服务器端的约定，非0就是错误
        } else {
            reject(response.message) // response.message也是与服务器端的约定，error_code !==0 就需要返回message
        }
    })
    .catch((err) => {
      reject(err)
    });
  });
}

function createCatFetchMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    const { type, catFetch, catMethod = 'GET', catParams, callback } = action;
    if (catFetch && catMethod) {
      console.log(type, catFetch, catMethod);
      dispatch({ type });
      const token = getState().auth.toJS().user.token;
      if (catMethod === 'GET') {
        return R_GET(catFetch, catParams, token)
               .then((data) => {
                 if (typeof callback === 'function') {
                  callback(null, data, dispatch, getState)
                 }
               })
               .catch((err)=> {
                  callback(err, null, dispatch, getState)
               });
      }
      if (catMethod === 'POST') {
        return R_POST(catFetch, catParams, token)
        .then((data) => {
          if (typeof callback === 'function') {
           callback(null, data, dispatch, getState)
          }
        })
        .catch((err)=> {
          callback(err, null, dispatch, getState)
        })
      }
    }
    return next(action);
  };
}

const catFetch = createCatFetchMiddleware();
catFetch.withExtraArgument = createCatFetchMiddleware;

export default catFetch;
