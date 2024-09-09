import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  headers: {
  },
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

const { post, get } = instance

export { post, get }

export default instance