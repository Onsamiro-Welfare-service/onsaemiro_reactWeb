import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField // TextField 추가
} from '@mui/material';

import { API } from '../../../apiLink'; // api 주소

EmailVerifyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default function EmailVerifyDialog({ open, onConfirm, onClose }) {
    const [verificationCode, setVerificationCode] = useState(''); // 사용자 입력을 위한 상태

    // 확인 버튼 클릭 시 실행될 함수
    const handleConfirm = () => {
        onConfirm(true); // 입력된 코드를 상위 컴포넌트의 처리 함수로 전달
        setVerificationCode(''); // 상태 초기화
        onClose(); // 다이얼로그 닫기
    };

    // post 로 이메일 인증 코드 확인하는 api 요청
    const verifyEmail = async () => {
        // console.log('verificationCode : ', verificationCode);
        try {
            const response = await axios.post(API.LoginIdCheck, verificationCode,{
                headers: {
                'Content-Type': 'application/json'
            }});
            if(response.status === 200){
                handleConfirm();
            }else{
                console.log('[Error : verifyEmail]: Response Status - ', response.status);
            }
            } catch(err){
            console.log('[Error : verifyEmail]: ',err);
        }
    };
    

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{"이메일 확인"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        이메일로 전송된 인증 코드를 입력하세요.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="verificationCode"
                        label="확인 코드"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} // 입력 값 상태 업데이트
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={verifyEmail} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
