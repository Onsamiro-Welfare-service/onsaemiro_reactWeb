import PropTypes from 'prop-types';
import { TextField, Box, Container, Slider } from '@mui/material';

ModifyForm.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
};

export default function ModifyForm({ userData, setUserData }) {
    const handleChange = (prop) => (event) => {
        setUserData({ ...userData, [prop]: event.target.value });
    };
    return (
        <Container id="form" maxWidth="sm" sx={{ width: '484px' }}>
            <Box sx={{ position: 'relative', left: '-25%' }}>
                <TextField
                    id="name-input"
                    label="이름(성함)"
                    type="text"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    value={userData.userName}
                    onChange={handleChange('userName')}
                />
                <TextField
                    id="address-input"
                    label="주소"
                    type="text"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    value={userData.userAddress}
                    onChange={handleChange('userAddress')}
                />
                <TextField
                    id="birth-input"
                    label="생년월일"
                    type="date"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={userData.userBirth}
                    onChange={handleChange('userBirth')}
                />
                <TextField
                    id="phone-input"
                    label="전화번호"
                    type="tel"
                    margin="normal"
                    fullWidth
                    variant="standard"
                    sx={{ mb: 2}}
                    inputProps={{ maxLength: 11, pattern: "\\d{11}" }}
                    placeholder="01012345678"
                    helperText="전화번호를 - 빼고 입력해주세요.  (예: 01012345678)"
                    value={userData.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                />
                <span style={{ color:'#637381', lineHeight: '1.4375em', fontSize: '14px', fontWeight: '400', marginTop: '5px'}}>중증도 단계:  { userData.userLevel }</span>   
                <Slider
                    label="중증도"
                    value={userData.userLevel}
                    onChange={handleChange('userLevel')}
                    valueLabelDisplay="auto"
                    step={1}
                    min={1}
                    max={2}
                />
            </Box>
        </Container>
    );
}
