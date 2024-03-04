// API 호출 함수
import axios from 'axios';
import { API } from './apiLink';
import { setCookie, getCookie } from './sections/auth/cookie/cookie'; 


// get 방식 api 호출
const accessToken = getCookie('accessToken');



export const getRequestApi = async (apiUrl, body = null, errMsg, navigate) => {
    const config = {
        method: "GET", // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${accessToken}` // 인증 토큰
        },
        params: body
    };
    // console.log("Sending API request:", config);

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        if (response.status === 200) {
            return response;
        }
        
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshToken = getCookie('refreshToken');
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken }, {headers: {'Content-Type': 'application/json'}});

            if (refreshResponse.status === 200) {
                setCookie('accessToken', refreshResponse.data.accessToken);
                setCookie('refreshToken', refreshResponse.data.refreshToken);
                return getRequestApi(apiUrl, body, errMsg, navigate); // 재귀 호출 시 navigate도 전달
            }
            console.log(errMsg, ': Need to login again.');
            navigate('/login', { replace: true });
        } else {
            console.log(errMsg, error);
        }
        return undefined;
    }
};
export const getDefaultRequestApi = async (apiUrl, errMsg, navigate) => {
    const config = {
        method: "GET", // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${accessToken}` // 인증 토큰
        }
    };
    // console.log("Sending API request:", config);

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        // console.log('1', response.data.categoryList);
        if (response.status === 200) {
            return response;
        }
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        console.log('여기선 뭘까', error.response);
        if (error.response && error.response.status === 401) {
            const refreshToken = getCookie('refreshToken');
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken }, {headers: {'Content-Type': 'application/json'}});

            if (refreshResponse.status === 200) {
                setCookie('accessToken', refreshResponse.data.accessToken);
                setCookie('refreshToken', refreshResponse.data.refreshToken);
                return getDefaultRequestApi(apiUrl, errMsg, navigate); // 재귀 호출 시 navigate도 전달
            }
            console.log(errMsg, ': Need to login again.');
            navigate('/login', { replace: true });
        } else {
            console.log(errMsg, error);
        }
        return undefined;
    }
};


export const postRequestApi = async (apiUrl, body, errMsg, navigate, method_="POST") => {
    const config = {
        method: method_, // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${accessToken}` // 인증 토큰
        },
        data: body
    };
    // console.log("Sending API request:", config);

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        if (response.status === 200) {
            return response;
        }
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshToken = getCookie('refreshToken');
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken }, {headers: {'Content-Type': 'application/json'}});

            if (refreshResponse.status === 200) {
                setCookie('accessToken', refreshResponse.data.accessToken);
                setCookie('refreshToken', refreshResponse.data.refreshToken);
                return postRequestApi(apiUrl, body, errMsg, navigate); 
            }
            console.error(errMsg, ': Need to login again.');
            navigate('/login', { replace: true });
        } else {
            console.error(errMsg, error);
        }
        return undefined;
    }
};

export const multiFormRequestApi = async (apiUrl, body, errMsg, navigate) => {
    const config = {
        method: "POST", // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'multipart/form-data', // 컨텐트 타입
            'Authorization': `Bearer ${accessToken}` // 인증 토큰
        },
        data: body
    };
    // console.log("Sending API request:", config);

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        if (response.status === 200) {
            return response;
        }
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshToken = getCookie('refreshToken');
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken }, {headers: {'Content-Type': 'application/json'}});

            if (refreshResponse.status === 200) {
                setCookie('accessToken', refreshResponse.data.accessToken);
                setCookie('refreshToken', refreshResponse.data.refreshToken);
                return multiFormRequestApi(apiUrl, body, errMsg, navigate); 
            }
            console.error(errMsg, ': Need to login again.');
            navigate('/login', { replace: true });
        } else {
            console.error(errMsg, error);
        }
        return undefined;
    }
};