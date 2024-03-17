import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Grid,
    Select,
    Slider,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';

import { getDefaultRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink';
import { getCookie } from '../../../auth/cookie/cookie';
// import { useState } from 'react';
// import CategoryAdd from './addSurveyDialog';

// import { TestCategoryArr } from '../constants';

function valuetext(value) {
    return `${value}°C`;
}

AddSurveySelectForm.propTypes = {
    inputs: PropTypes.object,
    setInputs: PropTypes.func,
}

// AddSurveySelectForm.defaultProps = {
//     inputs: {
//         id: 1,
//         categoryId: 1,
//         level: 0,
//         type: '0',
//         question: '',
//         imageUrl: null,
//         answerList: [{ description: '', imageUrl: null }, { description: '', imageUrl: null }],
//     }
// }


export default function AddSurveySelectForm({inputs, setInputs}) {
    const navigate = useNavigate();
    const [categorySelect, setCategorySelect] = useState([]);

    useEffect(() => {
        const getCategoryList = async () => {
          const errMsg = 'Error : getCategoryList';
      
          try {
            const response = await getDefaultRequestApi(API.getCategoryList, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
            console.log(response.data);
            if (response.status === 200 && response.data.categoryList !== undefined) {
                setCategorySelect(response.data.categoryList);
                if (!response.data.categoryList.some(category => category.id === inputs.categoryId)) {
                    setInputs(inputs => ({ ...inputs, categoryId: '' }));
                  }
            } else {
              console.error(errMsg, '지정되지 않은 에러');
            }
          } catch (error) {
            console.error(errMsg, error);
          }
        };
    
        getCategoryList();
      }, [navigate, inputs.categoryId, setInputs]);


    const selectedCategory = (event) => {
        console.log('selectedCategory', event.target.value);
        setInputs({ ...inputs, categoryId: Number(event.target.value)});
    };

    
    // const [surveyType, setSurveyType] = useState('');
    const selectedType = (event) => {
        setInputs({ ...inputs, type: event.target.value});
    }

    // const [level, setLevel] = useState(null);
    const levelChange = (event) => {
        setInputs({ ...inputs, level: event.target.value});
    }

    return (
        <Grid container padding={3} spacing={2}>
            {/* 카테고리 선택 */}
            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7'}}>카테고리 선택</span>
            </Grid>
            <Grid item xs={8}>
                <FormControl sx={{width:'70%'}}>
                    <InputLabel id="select-label">선택하기</InputLabel>
                    { categorySelect.length!==0 && // 카테고리가 없을 때는 렌더링 하지 않음
                    <Select labelId='test' id='test'
                        value={inputs.categoryId}
                        defaultValue={"선택하기"}
                        label='카테고리'
                        onChange={selectedCategory}>
                        { categorySelect.map((data) => (
                            <MenuItem key={data.id} value={String(data.id)}>
                                {data.name}
                            </MenuItem>))}
                    </Select>}
                </FormControl>
            </Grid>

            
            {/* 질문 종류 */}
            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7'}}>질문 종류</span>
            </Grid>
            <Grid item xs={8}>
                <FormControl sx={{width:'70%'}}>
                    <InputLabel id="select-label">선택하기</InputLabel>
                    <Select labelId='test1' id='test1'
                        value={inputs.type}
                        label='선택하기'
                        onChange={selectedType}>
                        <MenuItem value={0}>선택하기</MenuItem>
                        <MenuItem value={1}>선택형(2항)</MenuItem>
                        <MenuItem value={2}>선택형(3항)</MenuItem>
                        <MenuItem value={3}>선택형(4항)</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
            {/* 중증도 선택 */}
            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7'}}>중증도 단계</span>                
            </Grid>
            <Grid item xs={8} mt={1.5}>
                <Slider
                    aria-label="level"
                    value={inputs.level}
                    onChange={levelChange}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    min={1}
                    max={2}
                />
            </Grid>            
        </Grid>
    ); 
}