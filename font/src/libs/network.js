import axios from 'axios';
import { getToken, removeToken } from './storage';
import { apiPath } from './constants';

// 配置后端接口路径
axios.defaults.baseURL = apiPath;
//设置请求时间
axios.defaults.timeout = 90000;

axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.token = token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (res) {
    return res;
}, function (err) {
    // eslint-disable-next-line
    var appRouter = window.__VUE_APP__.$router;
    switch (err.response.status) {
        // 未授权或禁止访问
        case 401:
        case 403:
            removeToken();
            if (appRouter.currentRoute.name !== 'login') {
                if (appRouter.currentRoute.meta.iframeEnabled && appRouter.currentRoute.query.token) {
                    // 外部引用token过期或无效跳转到提示页
                    appRouter.push({
                        path: '/stop',
                        query: {
                            code: err.response.data && err.response.data.statusCode
                        }
                    });
                } else {
                    // 正常跳转到登录页
                    appRouter.push('/login');
                }
            }
            return Promise.resolve(err.response);
        default: break;
    }
    return Promise.reject(err);
});

export default axios;