import PropTypes from 'prop-types';

import { Button } from "@mui/material";

UserAnswerHeaders.propTypes = {
    userData: PropTypes.object,
    dateSet: PropTypes.func,
    dateValue: PropTypes.string,
};

export default function UserAnswerHeaders({userData, dateSet, dateValue}){

    return (
        <>
            <span style={{ fontSize: '24px', fontWeight:'bold' }}>{userData.userName}</span>
            <span style={{ fontSize: '20px', marginLeft:'10px', fontWeight:'bold' }}>{userData.id}</span>
            <input type="date" style={{ fontSize:'28px', fontWeight:'bold', border:'none', backgroundColor:'transparent', marginLeft:'20px'}} onChange={dateSet} value={dateValue}/>
            <Button variant='outlined' 
              sx={{
                ml:'15px',
                mb:'10px',
                fontSize: '20px',
              }}
              onClick={()=>{alert(userData[1])}}>로그인코드</Button>
        </>
    );

}