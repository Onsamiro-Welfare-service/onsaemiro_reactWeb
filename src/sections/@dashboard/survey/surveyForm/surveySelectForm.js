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

import { TestCategoryArr } from '../constants';

function valuetext(value) {
    return `${value}°C`;
}

AddSurveySelectForm.propTypes = {
    inputs: PropTypes.object,
    setInputs: PropTypes.func,
}

export default function AddSurveySelectForm({inputs, setInputs}) {
    // const [categorySelect, setCategorySelect] = useState('');
    const selectedCategory = (event) => {
        setInputs({ ...inputs, category: event.target.value});
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
                    <Select labelId='test' id='test'
                        value={inputs.category}
                        label='카테고리'
                        onChange={selectedCategory}>
                        {TestCategoryArr.data.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>))}
                    </Select>
                    {/* <CategoryAdd List={categoryList} setList={setCategoryList} item={categorySelect} setItem={selectedCategory} /> */}
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
                    min={0}
                    max={3}
                />
            </Grid>            
        </Grid>
    ); 
}