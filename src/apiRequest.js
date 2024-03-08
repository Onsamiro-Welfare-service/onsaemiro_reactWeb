// API 호출 함수
import axios from 'axios';
import { API } from './apiLink';
import { setCookie, rmCookie } from './sections/auth/cookie/cookie'; 


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
                    rmCookie();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return getRequestApi(apiUrl, body, errMsg, navigate, token, refreshTkn);
            }
        } else {
            console.log(errMsg, error);
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
                    rmCookie();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return getDefaultRequestApi(apiUrl, errMsg, navigate, token, refreshTkn);
            }
        } else {
            console.log(errMsg, error);
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
    // console.log("Sending API request:", config);

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
                    rmCookie();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return postRequestApi(apiUrl, body, errMsg, navigate, method_, token);
            }
        } else {
            console.error(errMsg, error);
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
            const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

            if (refreshResponse.status === 200) {
                const token = refreshResponse.data.accessToken;
                const refreshTkn = refreshResponse.data.refreshToken;

                if (token === null || refreshTkn === null) {
                    console.log('토큰 요청 에러. 로그아웃합니다');
                    rmCookie();
                    navigate('/login', { replace: true });
                }
                setCookie('accessToken', token);
                setCookie('refreshToken', refreshTkn);
                return multiFormRequestApi(apiUrl, body, errMsg, navigate, token, method_);
            }
        } else {
            console.error(errMsg, error);
        }
        return undefined;
    }
};

// export const deleteDefaultRequestApi = async (apiUrl, errMsg, navigate, token, refreshTkn) => {
//     const config = {
//         method: 'DELETE', // HTTP 메소드 (GET, POST 등)
//         url: apiUrl, // API URL
//         headers: {
//             'Content-Type':  'application/json', // 컨텐트 타입multipart/form-data
//             'Authorization': `Bearer ${token}` // 인증 토큰
//         }
//     };
//     // console.log("Sending API request:", config);

//     try {
//         const response = await axios(config); // axios에 설정 객체를 직접 전달
//         if (response.status === 200) {
//             return response;
//         }
//         return response.data;
        
//     } catch (error) {
//         // 오류 처리 로직
//         if (error.response && error.response.status === 401) {
//             const refreshResponse = await axios.post(API.refreshToken, { refreshToken: refreshTkn });

//             if (refreshResponse.status === 200) {
//                 setCookie('accessToken', refreshResponse.data.accessToken);
//                 setCookie('refreshToken', refreshResponse.data.refreshToken);
//                 return postRequestApi(apiUrl, errMsg, navigate, token);
//             }
//             console.error(errMsg, ': Need to login again.');
//             rmCookie();
//             navigate('/login', { replace: true });
//         } else {
//             console.error(errMsg, error);
//         }
//         return undefined;
//     }
// };
