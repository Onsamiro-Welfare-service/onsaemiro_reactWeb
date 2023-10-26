import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  const handleClickSignin = () => {
    // 여기에 로그인 관련 코드 입력
    // navigate('/login', { replace: true });
    console.log(loginId, loginPwd);
  };
  const handleClickSignUp = () => {
    // 여기에 회원가입 관련 코드 입력
    navigate('/signUp', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="loginId" 
          label="아이디" 
          onBlur={(e)=> setLoginId(e.target.value)}  
        />

        <TextField
          name="loginPassword"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          onBlur={(e)=> setLoginPwd(e.target.value)}
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

         <Link variant="subtitle2" underline="hover" href='/forgotLogin'> {/* 아직 기능 구현하지 않으므로 비활성화 */}
          아이디/비밀번호 찾기
        </Link>
      </Stack>

      <LoadingButton sx={{ 
        backgroundColor: 'rgba(255, 86, 48, 0.7)',
        boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
        '&:hover': {
          backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
        }
       }} fullWidth size="large" type="submit" variant="contained" onClick={handleClickSignin} >
        로그인
      </LoadingButton>

      <LoadingButton sx={{ 
        mt: 2,
        color:  'rgba(255, 86, 48, 0.7)',
        borderColor: 'rgba(255, 86, 48, 0.7)',
        '&:hover': {
          borderColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
          backgroundColor: 'rgba(255, 86, 48, 0.05)'
        }
      }} fullWidth size="large" type="submit" variant="outlined" onClick={handleClickSignUp} >
        회원가입
      </LoadingButton>
    </>
  );
}
