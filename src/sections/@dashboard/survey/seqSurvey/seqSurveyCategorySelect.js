import PropTypes from 'prop-types';

import { 
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
}from '@mui/material';

import { TestCategoryArr } from "../constants";

CategorySelect.propTypes = {
    category: PropTypes.number,
    setCategory: PropTypes.func,
}

export default function CategorySelect({category, setCategory}) {

    return (
        <Grid container padding={3} spacing={2}>

            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7', paddingLeft: 0}}>카테고리 선택</span>
            </Grid>

            {/* 카테고리 선택 */}
            <Grid item xs={8}>
                <FormControl sx={{width:'70%'}}>
                    <InputLabel id="select-label" >선택하기</InputLabel>
                    <Select labelId='test' id='test'
                        value={category}
                        label='카테고리'
                        onChange={(e) =>  setCategory(e.target.value)}>
                        {TestCategoryArr.data.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            
      </Grid>
        
    );
}