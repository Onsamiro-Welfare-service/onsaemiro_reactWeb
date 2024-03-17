import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Box, Container, Grid, Slider, Stack, Typography } from '@mui/material';
import { API } from '../../../../apiLink';

ProfileInputForm.propTypes = {
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired
};

export default function ProfileInputForm({ data, setData }) {
    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        const getDepartmentList = async () => { // API 호출 함수
            try {
                const response = await axios.get(API.departmentGetList, { headers: { 'Content-Type': 'application/json' }});
                if (response.status === 200) {
                    setDepartmentList(response.data.data);
                } else {
                    console.error('[Error : getDepartmentList]: Response Status - ', response.status);
                }
            } catch (err) {
                console.error('[Error : getDepartmentList]: ', err);
            }
        };

        getDepartmentList();
    }, []);

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
    };

    return (
        <Container maxWidth="sm" sx={{ width: '484px', height:'435px', position: 'relative', top: '-10px' }}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Stack spacing={2}>
                    <TextField
                        id="name-input"
                        label="이름(성함)"
                        type="text"
                        margin="normal"
                        fullWidth
                        value={data.name}
                        onChange={handleChange('name')}
                    />
                    <TextField
                        id="address-input"
                        label="주소"
                        type="text"
                        margin="normal"
                        fullWidth
                        value={data.address}
                        onChange={handleChange('address')}
                    />
                    <TextField
                        id="birth-input"
                        label="생년월일"
                        type="date"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={data.birth}
                        onChange={handleChange('birth')}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="select-label">소속 선택:</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={data.departmentId || ''}
                            onChange={handleChange('departmentId')}
                        >
                            <MenuItem value="">선택하세요</MenuItem>
                            {departmentList.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.departmentName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="phone-input"
                        label="전화번호"
                        type="tel"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={data.phoneNumber}
                        onChange={(e) => setData({...data, phoneNumber: e.target.value})}
                        inputProps={{
                            maxLength: 11,
                            pattern: "010\\d{8}" // "010"으로 시작하고, 그 뒤에 숫자 8개가 오는 패턴
                        }}
                        placeholder="01012345678"
                        helperText="전화번호를 - 없이 입력해주세요. 예: 01012345678"
                    />
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={5}>
                            <Typography variant="subtitle1" gutterBottom>중증도 단계:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Slider
                                aria-label="level"
                                value={data.userLevel}
                                onChange={handleChange('userLevel')}
                                valueLabelDisplay="auto"
                                step={1}
                                min={1}
                                max={2}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </Container>
    );
}
