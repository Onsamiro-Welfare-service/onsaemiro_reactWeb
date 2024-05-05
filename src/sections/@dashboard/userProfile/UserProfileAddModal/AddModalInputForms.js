import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';


import { Box, Container, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Slider, Grid, Divider, Checkbox, ListItemText } from '@mui/material';

import { API } from '../../../../apiLink';
import { getDefaultRequestApi } from '../../../../apiRequest';
// import { getCookie } from '../../../auth/cookie/cookie';

ProfileInputForm.propTypes = {
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
    selectedCategory: PropTypes.array.isRequired,
    setSelectedCategory: PropTypes.func.isRequired
};

export default function ProfileInputForm({ data, setData, selectedCategory, setSelectedCategory }) {
    const navigate = useNavigate();
    const [departmentList, setDepartmentList] = useState([]);
    const [categoryList, setCategoryList] = useState([{}]); 

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

        const getCategoryList = async () => {
            const errMsg = 'Error : getCategoryList';
            try {
                const cookies = new Cookies();
                const accessTkn = await cookies.get('accessToken');
                const refreshTkn = await cookies.get('refreshToken');
        
                // 쿠키 값이 undefined인 경우, 사용자에게 알리고 로그인 페이지로 리다이렉션
                if (!accessTkn || !refreshTkn) {
                    console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
                    alert('로그아웃 되었습니다.');
                    navigate('/login', { replace: true });
                    return;
                }
                const response = await getDefaultRequestApi(API.getCategoryList, errMsg, navigate, accessTkn, refreshTkn);
    
                if (response.status === 200 && response.data.categoryList !== undefined) {
                    setCategoryList(response.data.categoryList);
                } else {
                console.error(errMsg, '지정되지 않은 에러');
                }
            } catch (error) {
                console.error(errMsg, error);
            }
        };

        getDepartmentList();
        getCategoryList();
    }, [navigate]);

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
    };
    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
    };

   
    return (
        <Container maxWidth="sm" sx={{ width: '484px', height:'435px', position: 'relative', top: '-10px', pb: 3,  overflowY:'scroll', '&::-webkit-scrollbar': { display: 'none' }}}>
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
                    

                    <Divider sx={{ mt: 3, mb: 3, borderWidth: 1, borderColor: 'gray' }} />

                    <Select
                        multiple
                        value={selectedCategory}
                        onChange={handleSelectChange}
                        displayEmpty 
                        renderValue={() =>
                            "카테고리를 선택해주세요."
                        }
                    >
                        {categoryList.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                <Checkbox checked={selectedCategory.includes(category.id)} />
                                <ListItemText primary={category.name} />
                            </MenuItem>
                        ))}
                    </Select>

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
