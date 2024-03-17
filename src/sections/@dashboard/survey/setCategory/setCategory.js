import React, { useState, useEffect, useCallback  } from 'react';
import {  Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



import CategoryList from './categoryList';
import AddCategory from './addCategory';

import { getDefaultRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink'
import { getCookie } from '../../../auth/cookie/cookie';

const style = {
    width: '800px',
    height: '770px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

export default function ModalSetCategory() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const getCategoryList = useCallback(async () => {
        const errMsg = 'Error : getCategoryList';

        try {
            const response = await getDefaultRequestApi(API.getCategoryList, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
            if (response.status === 200 && response.data.categoryList !== undefined) {
                setCategories(response.data.categoryList);
            } else {
                console.error(errMsg, '지정되지 않은 에러');
            }
        } catch (error) {
            console.error(errMsg, error);
        }
    }, [navigate]);

    useEffect(() => {
        getCategoryList();
      }, [getCategoryList]);


    return (
        <Box sx={style}>
            <Typography variant="h4" gutterBottom>카테고리 설정</Typography>
            <Typography variant="h6" gutterBottom>카테고리 추가</Typography>

            <AddCategory reload={getCategoryList}/>

            <Typography variant="h6" gutterBottom component="div">카테고리 리스트</Typography>

            <CategoryList categories={categories} reload={getCategoryList}/>
        </Box>
    );
}