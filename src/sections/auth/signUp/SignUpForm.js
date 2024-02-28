import axios from 'axios';
import { useState, useEffect  } from 'react'; // useEffect
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
// @mui
import {  Stack, IconButton, InputAdornment, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
// components
import Iconify from '../../../components/iconify';
import { API } from '../../../apiLink';

// import EmailVerifyDialog from './emailVerify';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  // 비밀번호 보이기/숨기기
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  const [departmentList, setdepartmentList] = useState([]); // 부서 리스트

  const [inputData, setInputData] = useState({
    name: '',
    loginId: '',
    pwdData: '',
    pwdConfirm: '',
    department: '',
    email: ''
  });

  //  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false); // 이메일 확인 다이얼로그 오픈 여부

  const [validate, setValidate] = useState({// 회원가입 유효성 검사
    name_valid: false,
    loginId_valid: false,
    loginDoubleCheck: true,
    pwdData_valid: false,
    pwdConfirm_valid: false,
    department_valid: false,
    email_valid: false
    // emailVerify_valid: false
  }); 

  const registerManager = async() => { // 회원가입 요청
    // 여기에 회원가입 완료 관련 코드 입력
    const hashPwd = CryptoJS.SHA256(inputData.pwdData).toString(CryptoJS.enc.Base64);

    const manageData = {
      "name": inputData.name,
      "username": inputData.loginId,
      "password": hashPwd,
      "email": inputData.email,
      "departmentId": inputData.department
    }

    // 회원가입 요청 전 빈칸 체크(입력값을 통해 사전 유효성 검사 진행)
    setValidate(prevState => ({
      ...prevState, // 이전 상태의 다른 값들을 그대로 유지
      name_valid: prevState.name_valid || inputData.name.length === 0, // 이름이 빈칸 체크
      loginId_valid: prevState.loginId_valid || inputData.loginId.length === 0, // 아이디가 빈칸 체크
      pwdData_valid: prevState.pwdData_valid || inputData.pwdData.length === 0, // 비밀번호가 빈칸 체크
      pwdConfirm_valid: prevState.pwdConfirm_valid || (inputData.pwdData !== inputData.pwdConfirm), // 비밀번호 확인이 유효한지 체크
      department_valid: prevState.department_valid || inputData.department.length === 0, // 부서가 빈칸 체크
      email_valid: prevState.email_valid || inputData.email.length === 0 // 이메일이 빈칸 체크
    }));
    
    

    // 모든 필드가 유효한지 확인
    const validateCheck = Object.values(validate).some(value => value === true);
    if(validateCheck) {console.log('회원가입 조건 충족이 안됨 : ', validate);return;}
    
    console.log('manageData : ', manageData);
    try {
      const response = await axios.post(API.manageRegister, manageData);
      if(response.status === 200){
        alert("성공적으로 회원가입이 되었습니다."); // 관리자의 승인을 기다려주세요
        navigate('/dashboard', { replace: true });
      }else{
        console.log('[Error : registerManager] Regist: Response Status - ', response.status);
      }
    } catch(err){
      console.log('[Error : registerManager] Regist:',err);
    }
  };

 
  // 부서 리스트 받아오기
  const getDepartmentList = async() => {
    try {
      const response = await axios.get(API.departmentGetList, {
        headers: {
          'Content-Type': 'application/json'
      }});
      if(response.status === 200){
        // console.log('getDepartmentList:', response.data);
        setdepartmentList(response.data.data);
      }else{
        console.log('[Error : getDepartmentList]: Response Status - ', response.status);
      }
    } catch(err){
      console.log('[Error : getDepartmentList]: ',err);
    }
  };

  const postloginIdDoubleCheck = async() => {
    // console.log('postloginIdDoubleCheck', inputData.loginId);
    try {
      const response = await axios.post(API.LoginIdCheck, {managerId: inputData.loginId});
      if(response.status === 200){
        setValidate({...validate, loginDoubleCheck: false}); // 아이디 중복체크 
        console.log(response.data);
      }else{
        console.log('[Error : loginDoubleCheck]: Response Status - ', response.status);
      } 
    }catch(err){
      console.log('[Error : postloginIdDoubleCheck]: ',err);
    }
  };     
  
  
  
  
  const idEmptyChk = () => setValidate({...validate, loginId_valid:!/^[a-z0-9_-]{5,20}$/.test(inputData.loginId)});// 회원가입 - 아이디 형식 체크
  const passwordCheck = () => setValidate({...validate, pwdData_valid:!/^[a-zA-Z0-9!@#$%&]{8,16}$/.test(inputData.pwdData)});// 회원가입 - 비밀번호 형식 체크
  const passwordCompare = () => setValidate({...validate, pwdConfirm_valid: inputData.pwdData !== inputData.pwdConfirm });// 회원가입 - 비밀번호 일치하는지 체크
  const departmentCheck = (value) => setValidate({...validate, department_valid: value === ""});// 회원가입 - 기관이 선택되었는지 체크
  const emailCheck = () => setValidate({...validate, email_valid:!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputData.email)});// 회원가입 - 이메일 형식인지 체크
  
  // 페이지 로딩 후 바로 실행
  useEffect(() => {
    getDepartmentList();
  }, []);
  
  return (
    <>
      <Stack spacing={3}>
        {/* 이름 입력칸 */}
        <TextField 
          error={validate.name_valid}
          helperText={validate.name_valid ? "이름을 입력해주세요":""}
          name="loginName" 
          label="이름"
          value={inputData.name}
          onChange={(e)=> setInputData({...inputData, name: e.target.value })}
        />

        <Stack direction="row" spacing={2}>
        {/* 아이디 입력칸 */}
          <TextField 
          error={validate.loginId_valid}
          helperText={validate.loginId_valid ? "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.":""}
          name="loginId" 
          label="아이디"
          value={inputData.loginId}
          onChange={(e)=>{setInputData({...inputData, loginId: e.target.value }); setValidate({...validate, loginDoubleCheck: true})}}
          onBlur={idEmptyChk}
          sx={{ flexGrow: 1 }}
          /> 
          
          {validate.loginDoubleCheck ? 
          <Button variant="outlined" sx={{ height:'50px', fontWeight: 'bold', size: '15px'}} onClick={postloginIdDoubleCheck}>중복확인</Button>:
          <CheckIcon sx={{color: 'green', position:'relative',top:'15px'}}/>}

        </Stack>
        

        {/* 비밀번호 입력칸 */}
        <TextField
          error={validate.pwdData_valid}
          helperText={validate.pwdData_valid ? "8~16자의 영문 대/소문자, 숫자, 특수문자(!@#$%&)를 사용해 주세요.":""}
          name="loginPassword"
          label="비밀번호"
          type={showPassword1 ? 'text' : 'password'}
          value={inputData.pwdData}
          onChange={(e) => setInputData({ ...inputData, pwdData: e.target.value })}
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
          error={validate.pwdConfirm_valid}
          helperText={validate.pwdConfirm_valid ? "비밀번호가 일치하지 않습니다": ""}
          name="loginpasswordCompare"
          label="비밀번호 확인"
          type={showPassword2 ? 'text' : 'password'}
          value={inputData.pwdConfirm}
          onChange={(e)=> setInputData({ ...inputData, pwdConfirm: e.target.value })}
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
            error={validate.department_valid}
            value={inputData.department}
            onChange={(e) => {
              setInputData({ ...inputData, department: e.target.value }); 
              departmentCheck(e.target.value); 
            }}
            onClick={getDepartmentList}
          >
            <MenuItem value="">
          선택하세요
        </MenuItem>
        {departmentList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.departmentName}
          </MenuItem>
        ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>  
        {/* 이메일 입력칸 */}
          <TextField 
          error={validate.email_valid}
          helperText={validate.email_valid ? "이메일 형식: example@email.com":""}
          name="Email" 
          label="이메일"
          type="email" 
          variant="outlined"
          value={inputData.email}
          onChange={(e)=> setInputData({ ...inputData, email: e.target.value })}
          onBlur={emailCheck}
          sx={{ flexGrow: 1 }}
          /> 
          {/* <Button variant="outlined" sx={{ height:'50px', fontWeight: 'bold', size: '15px'}} onClick={()=>{setEmailVerifyOpen(true)}}>인증하기</Button>

          <EmailVerifyDialog 
            open={emailVerifyOpen} 
            onClose={()=>{setEmailVerifyOpen(false)}} 
            onConfirm={(isVerify)=>{setValidate({...validate, emailVerify_valid: isVerify})}} 
          /> */}
        </Stack>

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
