import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  cookies.set(name, value, { ...options, path: '/' });
  // console.log(`쿠키 "${name}"에 저장된 값: ${value}`);
};

export const getCookie = (name) => cookies.get(name);

export const rmCookie = () => {
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });
  cookies.remove('managerId', { path: '/' });
  cookies.remove('departmentId', { path: '/' });
  // cookies.remove(name, { path: '/'});
  console.log(`데이터가 정상적으로 삭제 되었습니다`);
};