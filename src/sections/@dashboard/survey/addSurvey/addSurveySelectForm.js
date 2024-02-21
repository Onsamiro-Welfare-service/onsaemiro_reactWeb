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

const TestCategoryArr = {
    "count": 3,
    "data": ['aa','bb','cc']
};

function valuetext(value) {
    return `${value}°C`;
}

AddSurveySelectForm.propTypes = {
    category: PropTypes.string,
    setCategory: PropTypes.func,
    type: PropTypes.string,
    setType: PropTypes.func,
    level: PropTypes.number,
    setLevel: PropTypes.func,
}

export default function AddSurveySelectForm({category, setCategory, type, setType, level, setLevel}) {
    // const [categorySelect, setCategorySelect] = useState('');
    const selectedCategory = (event) => {
        setCategory(event.target.value);
    };

    
    // const [surveyType, setSurveyType] = useState('');
    const selectedType = (event) => {
        setType(event.target.value);
    }

    // const [level, setLevel] = useState(null);
    const levelChange = (event) => {
        setLevel(event.target.value);
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
                        value={category}
                        label='카테고리'
                        onChange={selectedCategory}>

                        {TestCategoryArr.data.map((option, index) => (
                        <MenuItem key={index} value={option}>
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
                        value={type}
                        label='선택하기'
                        onChange={selectedType}>
                        <MenuItem value={'1'}>선택형(2항)</MenuItem>
                        <MenuItem value={'2'}>선택형(3항)</MenuItem>
                        <MenuItem value={'3'}>선택형(4항)</MenuItem>
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
                    value={level}
                    onChange={levelChange}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={3}
                    />
            </Grid>

            {/* 질문입력 */}
            {/* <Grid item xs={12}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7', marginRight:'20px'}}>질문 내용</span> 
                <span style={{fontSize: '12px', fontWeight:'bold', lineHeight:'2.7', marginRight:'20px'}}>*필수입력 사항입니다.</span> 
                <TextField variant='outlined' label='test' fullWidth/>
            </Grid> */}
            
            
        </Grid>
    ); 
}