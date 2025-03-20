// request.ts
import { ref } from 'vue';
import { showToast, showDialog, showConfirmDialog } from 'vant';
import router from '../router';
// const { push, replace } = router();
interface RequestOptions {
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
    // 其他可能需要的 fetch API 选项
}
const baseApi = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3033'
    // ? 'https://api.movecoding.cn'
    : 'https://api.movecoding.cn';
/**
 * 发送通用 HTTP 请求
 *
 * @param {string} method - 请求方法（'GET' 或 'POST'）
 * @param {string} url - 请求的 URL
 * @param {unknown} [data] - 要发送的数据（仅 POST 请求需要）
 * @param {Record<string, string>} [params] - 查询参数（仅 GET 请求需要）
 * @param {string} [contentType='application/json'] - 请求体的 Content-Type（仅 POST 请求需要）
 * @param {RequestOptions} [options] - fetch API 的其他选项（如 headers、credentials 等）
 * @returns {Promise<Response>} - fetch API 返回的 Promise，可解析为响应数据
 */
async function sendRequest(
    method: 'GET' | 'POST',
    url: string,
    data?: any,
    params: Record<string, string> = {},
    isAuth: boolean = false,
    contentType: string = 'application/json',
    options: RequestOptions = {},

): Promise<Response> {
    url = baseApi + url;
    // const defaultOptions: RequestInit = {
    //     credentials: 'include',
    // };

    // const mergedOptions = { ...defaultOptions, ...options };
    const mergedOptions = { ...options };
    let init: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    let finalUrl = url;

    if (method === 'GET') {
        if (params) {
            const queryString = Object.entries(params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
            finalUrl = `${url}?${queryString}`;
        }

        init = {
            method,
            ...mergedOptions,
        };
    } else if (method === 'POST') {
        init = {
            method,
            headers: {
                'Content-Type': contentType,
                ...mergedOptions.headers,
            },
            body: contentType === 'application/json' ? JSON.stringify(data) : data,
            ...mergedOptions,
        };
    }
    if (isAuth) {
        // 确保init对象已正确初始化，这里假设你已经在其他地方创建了init对象
        if (!init || typeof init !== 'object') {
            throw new Error('Invalid request object');
        }

        // 确保init.headers存在并是一个可扩展的对象
        if (!init.headers) {
            init.headers = {};
        }
        const headers: [string, string][] = [
            ['Content-Type', 'application/json'],
            ['Authorization', 'Bearer ' + localStorage.getItem('token')],
        ];

        init.headers = headers;
    }

    try {
        const response = await fetch(finalUrl, init);
        console.log('response', response);
        // 检查响应状态码
        if (!response.ok) {
            if (response.status === 404) {
                showToast('服务器连接失败!');
            }
            if (response.status === 500) {
                showToast('服务器内部错误!');
            }
            const errorMessage = await response.json();
            showToast(errorMessage);
            throw new Error(`请求失败: ${response.status} ${response.statusText}. 错误详情: ${errorMessage}`);
        }

        if (response.ok) {
            // 解析响应数据
            const responseData = contentType === 'application/json' ? await response.json() : await response.text();

            // console.log('responseqqq', responseData);
            if (responseData.status == -1) {
                showConfirmDialog({
                    title: '提示',
                    message: '登录失效',
                    confirmButtonText: '重新登录',
                    cancelButtonText: '退出'
                })
                    .then(() => {
                        // on confirm
                        localStorage.clear();
                        router.replace('/');
                    })
                    .catch(() => {
                        // on cancel
                        router.replace('/');
                    });
            }
            // 返回解析后的数据
            return responseData;
        }

        return response;
    } catch (error) {
        console.error('请求发生错误:', error);
        throw error; // 将错误向上抛出，供调用者处理
    }
}

// 确保init对象已正确初始化，且headers是可扩展的对象
function ensureInitHeaders(init: RequestInit) {
    if (!init || typeof init !== 'object') {
        throw new Error('Invalid request object');
    }
    if (!init.headers) {
        init.headers = {};
    }
}
// export { sendRequest };
export default {
    post(url: string, data: any, isAuth: boolean = false) {
        return sendRequest('POST', url, data, {}, isAuth);
    },
    get(url: string, data: any, isAuth: boolean = false) {
        return sendRequest('GET', url, '', data, isAuth);
    },
};