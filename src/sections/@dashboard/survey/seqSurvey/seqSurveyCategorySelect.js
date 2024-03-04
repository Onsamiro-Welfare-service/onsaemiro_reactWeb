import PropTypes from 'prop-types';

import { 
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
}from '@mui/material';

// import { TestCategoryArr } from "../constants";

CategorySelect.propTypes = {
    category: PropTypes.string,
    setCategory: PropTypes.func,
    categoryList: PropTypes.array,
}

export default function CategorySelect({category, setCategory, categoryList}) {
    return (
        <Grid container padding={3} spacing={2}>

            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7', paddingLeft: 0}}>카테고리 선택</span>
            </Grid>

            {/* 카테고리 선택 */}
            <Grid item xs={8}>
                <FormControl sx={{width:'70%'}}>
                    <InputLabel id="select-label" >선택하기</InputLabel>
                    { categoryList.length!==0 &&
                        <Select labelId='test' id='test'
                        value={String(category)}
                        defaultValue={''}
                        label='카테고리'
                        onChange={(e) =>  setCategory(e.target.value)}>
                        {categoryList.map((option) => (
                        <MenuItem key={option.id} value={String(option.id)}>
                            {option.name}
                        </MenuItem>))}
                    </Select>}
                </FormControl>
            </Grid>
            
      </Grid>
        
    );
}