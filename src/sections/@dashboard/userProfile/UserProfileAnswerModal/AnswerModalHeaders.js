import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle } from "@mui/material";

import { API } from '../../../../apiLink';
import { postRequestApi } from '../../../../apiRequest';
import { getCookie } from '../../../auth/cookie/cookie';

UserAnswerHeaders.propTypes = {
    userData: PropTypes.object,
    dateSet: PropTypes.func,
    dateValue: PropTypes.string,
};

export default function UserAnswerHeaders({userData, dateSet, dateValue}){
    const [loginCodeOpen, setLoginCodeOpen] = useState(false); // 로그인 코드
    const [loginCode, setLoginCode] = useState(''); // 로그인 코드
    
    const handleClose = () => {
        setLoginCodeOpen(false);
    }

    const navigate = useNavigate();
    const getUserLoginCode = async () => {
      const errMsg = 'Error : getUserLoginCode';
      const config = { id: userData.id };
  
      try {
        const response = await postRequestApi(API.getUserLoginCode, config, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
        if (response.status === 200 && response.data.loginCode !== undefined) {
          setLoginCode(response.data.loginCode);
          setLoginCodeOpen(true);
        } else {
          console.error(errMsg, '지정되지 않은 에러');
        }
      } catch (error) {
        console.error(errMsg, error);
      }
    };

    


    return (
        <>
            <span style={{ fontSize: '24px', fontWeight:'bold' }}>{userData.userName}</span>
            {/* <span style={{ fontSize: '20px', marginLeft:'10px', fontWeight:'bold' }}>{userData.id}</span> */}
            <input type="date" style={{ fontSize:'28px', fontWeight:'bold', border:'none', backgroundColor:'transparent', marginLeft:'20px'}} onChange={dateSet} value={dateValue}/>
            <Button variant='outlined' sx={{ ml:'15px', mb:'10px', fontSize: '20px'}} onClick={()=>{getUserLoginCode()}}>로그인코드</Button>
            
            <Dialog open={loginCodeOpen} onClose={handleClose} sx={{margin: 5, }}>
                <DialogTitle>{`[ ${loginCode} ]`}</DialogTitle>
            </Dialog>
        </>
    );

}