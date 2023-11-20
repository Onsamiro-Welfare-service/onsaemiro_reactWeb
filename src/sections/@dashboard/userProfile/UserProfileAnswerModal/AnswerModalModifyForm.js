import PropTypes from 'prop-types';

import { TextField, Box, Container } from '@mui/material';




ModifyForm.propTypes = {
    userData: PropTypes.object,
}

export default function ModifyForm({userData}){
  
    return (
      <Container id="form" maxWidth="sm" sx={{ width: '484px'}}>
        <Box
          sx={{ position:'relative', left:'-25%' }}
        >
          
          <TextField
            id="name-input"
            label="이름(성함)"
            type="text"
            margin="normal"
            fullWidth
            variant="standard"

            value={userData.name}
            // onChange={handleChange('name')}
          />
          <TextField
            id="address-input"
            label="주소"
            type="text"
            margin="normal"
            fullWidth
            variant="standard"

            value={userData.address}
            // onChange={handleChange('address')}
          />
          <TextField
            id="birth-input"
            label="생년월일"
            type="date"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={userData.birth}
            // onChange={handleChange('birth')}
          />
          <TextField
            id="phone-input"
            label="전화번호"
            type="tel"
            margin="normal"
            fullWidth
            variant="standard"

            inputProps={{
                maxLength: 11,
                pattern: "\\d{11}" // 숫자 11자리를 의미하는 정규식
              }}
              placeholder="01012345678"
              helperText="전화번호를 - 빼고 입력해주세요.  (예: 01012345678)"
            // 입력 값 변화를 다루는 핸들러 함수 (필요한 경우)
            // onChange={(e) => {
            //   // 입력 값이 숫자 11자리가 아닐 경우에 대한 처리
            //   const {value} = e.target.value;
            //   if (!value.match(/^\d{0,11}$/)) {
            //       alert("전화번호를 다시 확인해주세요!");
            //   }
            // }}
            value={userData.phone}
            // onChange={handleChange('phone')}
          />
          
          <TextField
            id="level-input"
            label="중증도"
            type='string'
            margin="normal"
            fullWidth
            variant="standard"

            value={userData.level}
            // onChange={handleChange('phone')}
          />
          
          
        </Box>
      </Container>
    );
}
  
