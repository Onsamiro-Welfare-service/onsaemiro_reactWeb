import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton, TextField, Button } from '@mui/material';

import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


import { multiFormRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink'
import { getCookie } from '../../../auth/cookie/cookie';


AddCategory.propTypes = {
    reload: PropTypes.func,
};

export default function AddCategory({ reload }) {
    const [imageUrl, setImageUrl] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    const handleImageChange = async(e) => {
        if (e.target.files[0]) {
            setImageUrl(e.target.files[0]);
        }
    };
     
    const handleImageClick = () => {
        const fileInput = document.getElementById('icon-button-file');
        if (fileInput) {
            fileInput.click();
        }
    }

    const createCategory = async () => {
        const errMsg = 'Error : getCategoryList';
        const requestData = {
            request: JSON.stringify({name: categoryName}),
            image: imageUrl
        }

        try {
            const response = await multiFormRequestApi(API.createCategory, requestData, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));

            if (response.status === 200) {
                setImageUrl('');
                setCategoryName('');
                reload();
            } else {
                console.error(errMsg, '지정되지 않은 에러');
            }
        } catch (error) {
            console.error(errMsg, error);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            {imageUrl !== '' ? (
                <Avatar src={URL.createObjectURL(imageUrl)} alt="Preview" sx={{ width: 56, height: 56, mr: 2, borderRadius:'5px' }} />
            ) : (
                <Avatar sx={{ width: 56, height: 56, mr: 2, borderRadius:'5px' }}>
                    <ImageNotSupportedIcon />
                </Avatar>
            )}
                    
            <TextField fullWidth label="카테고리 이름" variant="outlined" sx={{ mr: 2 }} value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
            <input accept="image/*" type="file" onChange={handleImageChange} style={{ display: 'none' }} id="icon-button-file" />

            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleImageClick}>
                <AddPhotoAlternateIcon />
            </IconButton>

            <Button variant="contained" sx={{ ml: 1 }} onClick={()=>createCategory()}>추가</Button>
        </Box>
    );
}