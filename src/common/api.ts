import sendRequest from './request';

// 发送 POST 请求（JSON 数据）
export const Login = (data: any) => sendRequest.post('/api/login', data);

export const Logout = (data: any) => sendRequest.post('/api/logout', data, true);

export const GetUserInfo = (userId: string) => sendRequest.get('/api/user/' + userId, '', true);


// // 发送 GET 请求
// sendRequest('GET', 'https://api.example.com/users', undefined, { page: '1', limit: '10' })
//     .then(response => response.json())
//     .then(data => console.log('GET Response:', data))
//     .catch(error => console.error('GET Error:', error));

// // 发送 POST 请求（JSON 数据）
// sendRequest('POST', 'https://api.example.com/users', { name: 'John Doe', email: 'john.doe@example.com' })
//     .then(response => response.json())
//     .then(data => console.log('POST Response:', data))
//     .catch(error => console.error('POST Error:', error));

// // 发送 POST 请求（表单数据）
// sendRequest('POST', 'https://api.example.com/upload', new FormData(formElement), undefined, 'multipart/form-data')
//     .then(response => response.json())
//     .then(data => console.log('POST Response:', data))
//     .catch(error => console.error('POST Error:', error));