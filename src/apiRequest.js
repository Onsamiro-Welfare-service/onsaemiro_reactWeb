import axios from 'axios';
import { API } from './apiLink';
import { setCookie } from './sections/auth/cookie/cookie'; // rmCookie

const handleApiResponse = async (response) => {
    if (response.status === 200) {
        return response;
    } 
    if (response.status === 500) {
        console.log('서버 에러입니다.');
        return undefined;
    }
    
    throw new Error(`Unexpected status code: ${response.status}`);
    
};

const refreshTokenIfNeeded = async (refreshTkn, navigate) => {
    try {
        const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });
        if (refreshResponse.status === 200) {
            const newToken = refreshResponse.data.accessToken;
            const newRefreshTkn = refreshResponse.data.refreshToken;
            setCookie('accessToken', newToken);
            setCookie('refreshToken', newRefreshTkn);
            return { newToken, newRefreshTkn };
        }
        console.log('토큰이 만료되었습니다. 로그아웃합니다.');
        // rmCookie();
        navigate('/login', { replace: true });
        return null;
    } catch(error) {
        console.error('토큰 갱신 실패:', error);
        // rmCookie();
        navigate('/login', { replace: true });  
        return null;
    }
    
    
};

const makeApiRequest = async (config, errMsg, navigate, refreshTkn, retryFunction) => {
    try {
        const response = await axios(config);
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return handleApiResponse(response);
    } catch (error) {
        console.log(errMsg);
        if (error.response && error.response.status === 401) {
            const tokens = await refreshTokenIfNeeded(refreshTkn, navigate);
            if (tokens) {
                return retryFunction();
            }
        }
        console.error(errMsg, error);
        return undefined;
    }
};

export const getRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn) => {
    const config = {
        method: "GET",
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: body
    };
    return makeApiRequest(config, errMsg, navigate, refreshTkn, () => getRequestApi(apiUrl, body, errMsg, navigate, token, refreshTkn));
};

export const getDefaultRequestApi = async (apiUrl, errMsg, navigate, token, refreshTkn) => {
    const config = {
        method: "GET",
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    return makeApiRequest(config, errMsg, navigate, refreshTkn, () => getDefaultRequestApi(apiUrl, errMsg, navigate, token, refreshTkn));
};

export const postRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn, method_ = "POST") => {
    const config = {
        method: method_,
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: body
    };
    return makeApiRequest(config, errMsg, navigate, refreshTkn, () => postRequestApi(apiUrl, body, errMsg, navigate, token, refreshTkn, method_));
};

export const multiFormRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn, method_ = "POST") => {
    const config = {
        method: method_,
        url: apiUrl,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        data: body
    };
    return makeApiRequest(config, errMsg, navigate, refreshTkn, () => multiFormRequestApi(apiUrl, body, errMsg, navigate, token, refreshTkn, method_));
};
