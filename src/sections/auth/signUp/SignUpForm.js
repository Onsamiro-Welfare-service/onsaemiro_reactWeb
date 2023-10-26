import axios from 'axios';
import { useState } from 'react'; // useEffect
import { useNavigate } from 'react-router-dom';
// @mui
import {  Stack, IconButton, InputAdornment, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { API } from '../../../apiLink';


// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  const [loginId, setId] = useState('');
  const [pwdData, setPwdData] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [department, setdepartment] = useState('');
  const [email, setEmail] = useState('');
  const [option, setOption] = useState([1,2,3]);

  const [pwdCompare, setpwdCompare] = useState(false);
  const [pwdStatus, setPwdStatus] = useState(false);
  const [idStatus, setIdStatus] = useState(false);
  const [departmentStatus, setDepartmentStatus] = useState(false);
  const [emailStaus, setEmailStatus] = useState(false);
  const handleClick = async() => { // 회원가입 요청
    // 여기에 회원가입 완료 관련 코드 입력
    const manageData = {
      "username": loginId,
      "password": pwdData,
      "email": email,
      "departmentId": department 
    }

    if(!pwdCompare || !pwdStatus || !idStatus || !departmentStatus || !emailStaus){
      alert("[Error]: 형식에 맞게 입력되지 않은 칸이 존재합니다.");
      return;
    }

    try {
      const response = await axios.post(API.manageRegister, manageData);
      if(response.status === 200){
        alert("성공적으로 회원가입이 되었습니다."); // 관리자의 승인을 기다려주세요
        navigate('/login', { replace: true });
      }else{
        console.log('Error: SignUpForm manage register is not complete. Response Status', response.status);
      }
    } catch(err){
      console.log('Error!: SignUpForm manage register is not complete :', err);
    }
    
    
  };

  const getDepartmentList = async() => {
    try {
      const response = await axios.post(API.departmentGetList);
      if(response.status === 200){
        setOption(response.data);
      }else{
        console.log('Error: SignUpForm manage register is not complete. Response Status', response.status);
      }
    } catch(err){
      console.log('Error!: SignUpForm manage register is not complete :', err);
    }
  }
  
  const idEmptyChk = () => { // 회원가입 - 아이디 빈칸 체크
    const regex = /^[a-z0-9_-]{5,20}$/;
    if(regex.test(loginId)){
      setIdStatus(false);
    } else {
      setIdStatus(true);
    }
  };
  const passwordCheck = () => { // 회원가입 - 비밀번호 형식 체크
    const regex = /^[a-zA-Z0-9!@#$%&]{8,16}$/;
    if(regex.test(pwdData)){
      setPwdStatus(false);
    } else {
      setPwdStatus(true);
    }
  };

  const passwordCompare = () => { // 회원가입 - 비밀번호 일치하는지 체크
    if(pwdData !== pwdConfirm){
      setpwdCompare(true);
    } else {
      setpwdCompare(false); 
    }
  };

  const departmentCheck = () => { // 회원가입 - 기관이 선택되었는지 체크
    if(department.length <= 0){
      setDepartmentStatus(true);
    } else {
      setDepartmentStatus(false);
    }
  };

  const emailCheck = () => { // 회원가입 - 이메일 형식인지 체크
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(email)){
      setEmailStatus(false);
    } else {
      setEmailStatus(true);
    }
  };
  

  
  return (
    < >
      <Stack spacing={3}>
        <TextField 
        required 
        error={idStatus}
        helperText={idStatus ? "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.":""}
        name="loginId" 
        label="아이디"
        value={loginId}
        onChange={(e)=>setId(e.target.value)}
        onBlur={idEmptyChk}
        /> 

        <TextField
          required
          error={pwdStatus}
          helperText={pwdStatus ? "8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%&)를 사용해 주세요.":""}
          name="loginPassword"
          label="비밀번호"
          type={showPassword1 ? 'text' : 'password'}
          value={pwdData}
          onChange={(e) => setPwdData(e.target.value)}
          onBlur={passwordCheck}

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
          error={pwdCompare}
          helperText={pwdCompare ? "비밀번호가 일치하지 않습니다": ""}
          name="loginpasswordCompare"
          label="비밀번호 확인"
          type={showPassword2 ? 'text' : 'password'}
          value={pwdConfirm}
          onChange={(e)=> setPwdConfirm(e.target.value)}
          onBlur={passwordCompare}


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

        <FormControl>
          <InputLabel id="select-label">소속 선택:</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            error={departmentStatus}
            helperText={departmentStatus ? "소속된 기관을 추가하거나 선택해주세요":""}
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
            onBlur={departmentCheck}
            onClick={getDepartmentList}
          >
            <MenuItem value="">
              <em>기관 선택하기</em>
            </MenuItem>
            {option.map((index) => (
              <MenuItem key={index} value={index.id}>
                {index.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          
        <TextField 
        required 
        error={emailStaus}
        helperText={emailStaus ? "이메일 형식: example@email.com":""}
        name="Email" 
        label="이메일"
        type="email" // Set the type to "email"
        variant="outlined"
        onChange={(e)=> setEmail(e.target.value)}
        onBlur={emailCheck}
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
