import PropTypes from 'prop-types';


import {
    Grid,
    Select,
    Slider,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';


// import { useState } from 'react';
// import CategoryAdd from './addSurveyDialog';


function valuetext(value) {
    return `${value}°C`;
}

AddSurveySelectForm.propTypes = {
    inputs: PropTypes.object,
    setInputs: PropTypes.func,
    category: PropTypes.array
}


export default function AddSurveySelectForm({inputs, setInputs, category}) {
    
    const selectedCategory = (event) => {
        // console.log('selectedCategory', event.target.value);
        setInputs({ ...inputs, categoryId: Number(event.target.value)});
    };

    
    // const [surveyType, setSurveyType] = useState('');
    const selectedType = (event) => {
        setInputs({ ...inputs, type: event.target.value});
    }

    // const [level, setLevel] = useState(null);
    const levelChange = (event) => {
        setInputs({ ...inputs, userLevel: event.target.value});
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
                    { category.length!==0 && // 카테고리가 없을 때는 렌더링 하지 않음
                    <Select labelId='test' id='test'
                        value={inputs.categoryId}
                        defaultValue={"선택하기"}
                        label='카테고리'
                        onChange={selectedCategory}>
                        { category.map((data) => (
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
                        <MenuItem value={1}>객관식(2항)</MenuItem>
                        <MenuItem value={2}>객관식(3항)</MenuItem>
                        {/* <MenuItem value={3}>선택형(4항)</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            
            {/* 중증도 선택 */}
            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7'}}>중증도</span>                
            </Grid>
            <Grid item xs={8} mt={1.5}>
                <Slider
                    aria-label="level"
                    value={inputs.userLevel}
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