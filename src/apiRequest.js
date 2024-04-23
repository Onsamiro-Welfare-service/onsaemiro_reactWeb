// API 호출 함수
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { API } from './apiLink';
import { setCookie } from './sections/auth/cookie/cookie'; 


const cookies = new Cookies();

function removeCookies(){
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    cookies.remove('managerId', { path: '/' });
    cookies.remove('departmentId', { path: '/' });
}

export const getRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn) => {
    const config = {
        method: "GET", // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${token}` // 인증 토큰
        },
        params: body
    };

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        if (response.status === 200) {
            return response;
        }
        
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

            if (refreshResponse.status === 200) {
                const token = refreshResponse.data.accessToken;
                const refreshTkn = refreshResponse.data.refreshToken;

                if (token === null || refreshTkn === null) {
                    console.log('토큰 요청 에러. 로그아웃합니다');
                    removeCookies();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return getRequestApi(apiUrl, body, errMsg, navigate, token, refreshTkn);
            }
        } else {
            console.log(errMsg, error);
            console.log('토큰 요청 에러. 로그아웃합니다');
            removeCookies();
            navigate('/login', { replace: true });
        }
        return undefined;
    }
};
export const getDefaultRequestApi = async (apiUrl, errMsg, navigate, token, refreshTkn) => {
    const config = {
        method: "GET", // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${token}` // 인증 토큰
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
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

            if (refreshResponse.status === 200) {
                const token = refreshResponse.data.accessToken;
                const refreshTkn = refreshResponse.data.refreshToken;

                if (token === null || refreshTkn === null) {
                    console.log('토큰 요청 에러. 로그아웃합니다');
                    removeCookies();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return getDefaultRequestApi(apiUrl, errMsg, navigate, token, refreshTkn);
            }
        } else {
            console.log(errMsg, error);
            console.log('토큰 요청 에러. 로그아웃합니다');
            removeCookies();
            navigate('/login', { replace: true });
        }
        return undefined;
    }
};

export const postRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn, method_="POST") => {
    const config = {
        method: method_, // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
            'Authorization': `Bearer ${token}` // 인증 토큰
        },
        data: body
    };

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        return response;

    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

            if (refreshResponse.status === 200) {
                const token = refreshResponse.data.accessToken;
                const refreshTkn = refreshResponse.data.refreshToken;

                if (token === null || refreshTkn === null) {
                    console.log('토큰 요청 에러. 로그아웃합니다');
                    removeCookies();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return postRequestApi(apiUrl, body, errMsg, navigate, method_, token);
            }
        } else {
            console.error(errMsg, error);
            console.log('토큰 요청 에러. 로그아웃합니다');
            removeCookies();
            navigate('/login', { replace: true });
        }
        return undefined;
    }
};

export const multiFormRequestApi = async (apiUrl, body, errMsg, navigate, token, refreshTkn, method_="POST") => {
    const config = {
        method: method_, // HTTP 메소드 (GET, POST 등)
        url: apiUrl, // API URL
        headers: {
            'Content-Type':  'multipart/form-data', // 컨텐트 타입
            'Authorization': `Bearer ${token}` // 인증 토큰
        },
        data: body
    };

    try {
        const response = await axios(config); // axios에 설정 객체를 직접 전달
        if (response.status === 200) {
            return response;
        }
        return response.data;
        
    } catch (error) {
        // 오류 처리 로직
        if (error.response && error.response.status === 401) {
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

            if (refreshResponse.status === 200) {
                const token = refreshResponse.data.accessToken;
                const refreshTkn = refreshResponse.data.refreshToken;

                if (token === null || refreshTkn === null) {
                    console.log('토큰 요청 에러. 로그아웃합니다');
                    removeCookies();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return multiFormRequestApi(apiUrl, body, errMsg, navigate, token, method_);
            }
        } else {
            console.error(errMsg, error);
            console.log('토큰 요청 에러. 로그아웃합니다');
            removeCookies();
            navigate('/login', { replace: true });
        }
        return undefined;
    }
};

