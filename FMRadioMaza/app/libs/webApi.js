import {

  ToastAndroid,
} from 'react-native';

class WebApi {
  static headers(token) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'idToken': token,
    }
  }

  static get(host, route, token) {
    return this.fetch(host, route, null, 'GET', token);
  }

  static put(host, route, params, token) {
    return this.fetch(host, route, params, 'PUT', token)
  }

  static post(host, route, params, token) {
    return this.fetch(host, route, params, 'POST', token)
  }

  static delete(host, route, token) {
    return this.fetch(host, route, null, 'DELETE', token)
  }

  static fetch(host, route, params, verb, token) {
    const url = `${host}${route}`
    //logDebug("Request URL: " + url)
    console.log("Request URL: " + url)
    if(params !== null && params !== undefined) {
      //logDebug("Parameters: " + params)
    }
    let options = Object.assign({ method: verb },
      params ? { body: params } : null);
    options.headers = WebApi.headers(token)
    //logDebug("Request Headers: " + JSON.stringify(options.headers))
    options.timeout = 1000 * 2;
    return fetch(url, options);
  }

  static getWithHeader(host, route, header) {
    return this.fetchWithHeader(host, route, null, 'GET', header);
  }

  static putWithHeader(host, route, params, header) {
    return this.fetchWithHeader(host, route, params, 'PUT', header)
  }

  static postWithHeader(host, route, params, header) {
    return this.fetchWithHeader(host, route, params, 'POST', header)
  }

  static deletWithHeader(host, route, header) {
    return this.fetchWithHeader(host, route, null, 'DELETE', header)
  }

  static fetchWithHeader(host, route, params, verb, header) {
    const url = `${host}${route}`
    //logDebug("Request URL: " + url)
    if(params !== null && params !== undefined) {
      //logDebug("Parameters: " + params)
    }
    let options = Object.assign({ method: verb },
      params ? { body: params } : null);
    options.headers = header
    //logDebug("Request Headers: " + JSON.stringify(options.headers))
    options.timeout = 1000 * 2;
    return fetch(url, options);
  }
}
export default WebApi
