import axios from 'axios';
import AppStorage from "./localStorage";

var packageFile = require("../../package.json");

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? packageFile.proxy : null,
});
const isWebVersion = !!+process.env.REACT_APP_WEB_BUILD

const cachedRequest = async (url) => {
  const cachedResponse = await AppStorage.getItem(url)
  let headers = {}
  let response
  if (!isWebVersion && cachedResponse) {
    let etag = JSON.parse(cachedResponse).headers.etag
    headers = {
      'If-None-Match': etag,
    }
  }

  try {
    response = await axiosInstance.get(url, { headers })
    if (response.headers.etag) {
      AppStorage.setItem(url, response)
    }
  } catch (error) {
    if (!error.response || error.response.status !== 304) {
      return null //throw error
    }
    if (!cachedResponse) {
      throw 'Network Failed'
    }
    response = error.response
    response.status = 200
    response.data = JSON.parse(cachedResponse).data
  }
  return response.data
}

export default cachedRequest