import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {  Stack, IconButton, InputAdornment, TextField, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClick = () => {
    // 여기에 회원가입 완료 관련 코드 입력
    navigate('/dashboard/user', { replace: true });
  };

  return (
    < >
      <Stack spacing={3}>
        <TextField 
        required 
        name="loginId" 
        label="아이디"/> 

        <TextField
          required
          name="loginPassword"
          label="비밀번호"
          type={showPassword1 ? 'text' : 'password'}
          error 
          onBlur={(event)=> console.log(event.target.value)}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword1(!showPassword1)} edge="end">
                  <Iconify icon={showPassword1 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField 
          required
          name="loginPasswordCheck"
          label="비밀번호 확인"
          type={showPassword2 ? 'text' : 'password'}
          error

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                  <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField 
        required 
        name="AuthenticationCode" 
        label="인증코드"
        /> 
        
        <TextField 
        required 
        name="Email" 
        label="이메일"
        type="email" // Set the type to "email"
        variant="outlined"
        fullWidth
        /> 

         <LoadingButton sx={{ 
        backgroundColor: 'rgba(255, 86, 48, 0.7)',
        boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
        '&:hover': {
          backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
        }
       }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick} >
        가입하기
      </LoadingButton>
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
         <Typography variant="body2" sx={{ ml:"-175px" }}>
          로그인 정보 기억하기.
          </Typography> 
          
         <Link variant="subtitle2" underline="hover" href='/forgotLogin'> 
          아이디/비밀번호 찾기
        </Link>
      </Stack> */}

     
    </>
  );
}
