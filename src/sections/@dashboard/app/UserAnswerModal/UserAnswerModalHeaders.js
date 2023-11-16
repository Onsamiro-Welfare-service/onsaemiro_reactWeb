import PropTypes from 'prop-types';

import { Button } from "@mui/material";

UserAnswerHeaders.propTypes = {
    userData: PropTypes.array
};

export default function UserAnswerHeaders({userData}){
  // 보류
    return (
        <>
            <span style={{ fontSize: '24px' }}>{userData[0]}</span>
            <span style={{ fontSize: '20px', marginLeft:'10px' }}>{userData[1]}</span>
            <input type="date" style={{ fontSize:'20px', fontWeight:'bold', border:'none', backgroundColor:'transparent', marginLeft:'20px'}} />
            <Button variant='outlined' 
            sx={{
                ml:'15px',
                mb:'10px',
                fontSize: '20px',
            }}>로그인코드</Button>
        </>
    );

}