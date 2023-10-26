import axios from 'axios';
import { useState, useEffect  } from 'react'; // useEffect
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
  const [departmentList, setdepartmentList] = useState([]);

  const [idStatus, setIdStatus] = useState(false);
  const [pwdCompare, setpwdCompare] = useState(false);
  const [pwdStatus, setPwdStatus] = useState(false);
  const [departmentStatus, setDepartmentStatus] = useState(false);
  const [emailStaus, setEmailStatus] = useState(false);

  const registerManager = async() => { // 회원가입 요청
    // 여기에 회원가입 완료 관련 코드 입력
    const manageData = {
      "username": loginId,
      "password": pwdData,
      "email": email,
      "departmentId": department
    }

    // 회원가입 요청 전 데이터 형식 체크
    let isChk = false
    if(loginId.length === 0){
      setIdStatus(true);
      isChk = true;
    }
    if(pwdData.length === 0){
      setPwdStatus(true);
      isChk = true;
    }
    if(department.length === 0){
      setDepartmentStatus(true);
      isChk = true;
    }
    if(email.length === 0){
      setEmailStatus(true);
      isChk = true;
    }
    if(isChk){
      return;
    }
    
    // 회원가입 API 요청 - POST
    try {
      const response = await axios.post(API.manageRegister, manageData);
      if(response.status === 200){
        alert("성공적으로 회원가입이 되었습니다."); // 관리자의 승인을 기다려주세요
        navigate('/login', { replace: true });
      }else{
        console.log('[Error : registerManager]: Response Status - ', response.status);
      }
    } catch(err){
      console.log('[Error : registerManager]:',err);
    }
  };

 
  // 부서 리스트 받아오기
  const getDepartmentList = async() => {
    try {
      const response = await axios.get(API.departmentGetList);
      if(response.status === 200){
        console.log(response.data.data);
        setdepartmentList(response.data.data);
      }else{
        console.log('[Error : getDepartmentList]: Response Status - ', response.status);
      }
    } catch(err){
      console.log('[Error : getDepartmentList]: ',err);
    }
  };
  
  
  // 회원가입 - 아이디 빈칸 체크
  const idEmptyChk = () => { 
    const regex = /^[a-z0-9_-]{5,20}$/;
    if(regex.test(loginId)){
      setIdStatus(false);
    } else {
      setIdStatus(true);
    }
  };

  // 회원가입 - 비밀번호 형식 체크
  const passwordCheck = () => { 
    const regex = /^[a-zA-Z0-9!@#$%&]{8,16}$/;
    if(regex.test(pwdData)){
      setPwdStatus(false);
    } else {
      setPwdStatus(true);
    }
  };

  // 회원가입 - 비밀번호 일치하는지 체크
  const passwordCompare = () => { 
    if(pwdData === pwdConfirm){
      setpwdCompare(false);
    } else {
      setpwdCompare(true); 
    }
  };

  // 회원가입 - 기관이 선택되었는지 체크
  const departmentCheck = (value) => { 
    if(value === ""){
      setDepartmentStatus(true);
    } else {
      setDepartmentStatus(false);
    }
  };

  // 회원가입 - 이메일 형식인지 체크
  const emailCheck = () => { 
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regex.test(email)){
      setEmailStatus(false);
    } else {
      setEmailStatus(true);
    }
  };
  
  // 페이지 로딩 후 바로 실행
  useEffect(() => {
    getDepartmentList();
  }, []);
  
  return (
    < >
      <Stack spacing={3}>
        {/* 아이디 입력칸 */}
        <TextField 
        error={idStatus}
        helperText={idStatus ? "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.":""}
        name="loginId" 
        label="아이디"
        value={loginId}
        onChange={(e)=>setId(e.target.value)}
        onBlur={idEmptyChk}
        /> 

        {/* 비밀번호 입력칸 */}
        <TextField
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

        {/* 비밀번호 확인 입력칸 */}
        <TextField 
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

        {/* 소속기관 선택 Select칸 */}
        <FormControl>
          <InputLabel id="select-label">소속 선택:</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            error={departmentStatus}
            value={department}
            onChange={(e) => {
              console.log("선택됨:",e.target.value);
              setdepartment(e.target.value); 
              departmentCheck(e.target.value); 
            }}
            onClick={getDepartmentList}
          >
            <MenuItem value="">
          선택하세요
        </MenuItem>
        {departmentList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
          </Select>
        </FormControl>
          
        {/* 이메일 입력칸 */}
        <TextField 
        error={emailStaus}
        helperText={emailStaus ? "이메일 형식: example@email.com":""}
        name="Email" 
        label="이메일"
        type="email" 
        variant="outlined"
        onChange={(e)=> setEmail(e.target.value)}
        onBlur={emailCheck}
        fullWidth
        /> 

        {/* 회원가입하기 버튼 */}
        <LoadingButton sx={{ 
          backgroundColor: 'rgba(255, 86, 48, 0.7)',
          boxShadow: '0 8px 16px 0 rgba(255, 86, 48, 0.14)',
          '&:hover': {
            backgroundColor: 'rgba(255, 86, 48)', // hover 시 배경 색상 변경
          }
        }} fullWidth size="large" type="submit" variant="contained" onClick={registerManager} >
          가입하기
        </LoadingButton>
      </Stack>
    </>
  );
}
