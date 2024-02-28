import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { API } from '../../../apiLink';
import { setCookie, getCookie } from '../cookie/cookie'; 

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  const [idStatus, setIdStatus] = useState(false);
  const [pwdStatus, setPwdStatus] = useState(false);

  // 로그인 요청 API - POST
  const loginManager = async() => {

    // 로그인 요청 전 데이터 무결성 확인
    setIdStatus(loginId.length === 0);
    setPwdStatus(loginPwd.length === 0);
    if(idStatus || pwdStatus) return;

    // 데이터 이상 없을 시 로그인 요청
    console.log('loginId : ', loginId, 'loginPwd : ', CryptoJS.SHA256(loginPwd).toString(CryptoJS.enc.Base64));

    try {
      const response = await axios.post(API.loginAdmin, 
        {
          "username": loginId,
          "password": CryptoJS.SHA256(loginPwd).toString(CryptoJS.enc.Base64)
        }
      );
      if(response.status === 200){
        console.log(response.data);
        setCookie('accessToken', response.data.accessToken);
        setCookie('refreshToken', response.data.refreshToken);
        setCookie('managerId', response.data.id);
        navigate('/dashboard', { replace: true });
         
        
      }else{
        console.log('[Error : loginManager]: Response Status - ', response.status);
      }
    } catch(err){
      console.log('[Error : loginManager]:',err);
    }
  };

  // 회원가입 페이지로 이동
  const handleClickSignUp = () => {
    navigate('/signUp', { replace: true });
  };

  useEffect(() => {
    // const accTkn = getCookie('accessToken');
    const rfshTkn = getCookie('refreshToken');
    if(rfshTkn !== null && rfshTkn !== undefined){
      alert("로그인 되었습니다");
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Stack spacing={3}>
        {/* 아이디 입력칸 */}
        <TextField 
          name="loginId" 
          label="아이디" 
          error={idStatus}
          helperText={idStatus ? "아이디를 입력해주세요":""}
          onBlur={(e)=> {
            setLoginId(e.target.value);
            if(e.target.value.length !== 0){
              setIdStatus(false);
            } else {
              setIdStatus(true);
            }
          }}  
        />

        {/* 비밀번호 입력칸 */}
        <TextField
          name="loginPassword"
          label="비밀번호"
          error={pwdStatus}
          helperText={pwdStatus ? "비밀번호를 입력해주세요":""}
          type={showPassword ? 'text' : 'password'}
          onBlur={(e)=> {
            setLoginPwd(e.target.value);
            if(e.target.value.length !== 0){
              setPwdStatus(false);
            } else {
              setPwdStatus(true);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
         <Typography variant="body2" sx={{ ml:"-175px" }}>
          로그인 정보 기억하기.
          </Typography>

         <Link variant="subtitle2" underline="hover" onClick={() => {alert("아직 지원되지 않는 기능입니다.")}}> {/* href='forgotLogin'아직 기능 구현하지 않으므로 비활성화 */}
          아이디/비밀번호 찾기
        </Link>
      </Stack>

      <LoadingButton sx={{ 
        backgroundColor: 'rgba(255, 86, 48, 0.7)',
        boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
        '&:hover': {
          backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
        }
       }} fullWidth size="large" type="submit" variant="contained" onClick={loginManager} >
        로그인
      </LoadingButton>

      <LoadingButton 
        sx={{ 
          mt: 2,
          color:  'rgba(255, 86, 48, 0.7)',
          borderColor: 'rgba(255, 86, 48, 0.7)',
          '&:hover': {
            borderColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
            backgroundColor: 'rgba(255, 86, 48, 0.05)'
          }
        }} 
        fullWidth size="large" type="submit" variant="outlined" onClick={handleClickSignUp} >
        회원가입
      </LoadingButton>
    </>
  );
}
