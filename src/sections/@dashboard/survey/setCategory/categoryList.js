import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import { Avatar, Box, Dialog, IconButton, Typography, TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { postRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink'
// import { getCookie } from '../../../auth/cookie/cookie';

CategoryList.propTypes = {
    categories: PropTypes.array,
    reload: PropTypes.func,
};

const categoryListStyle = { 
    display: 'flex', 
    justifyContent: 'center', 
    margin: '10px 0', 
    padding: 2, 
    border: '1px solid #e0e0e040', 
    borderRadius: '5px', 
    boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' 
};

export default function CategoryList({ categories, reload }) {
    const [editStates, setEditStates] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const newEditStates = categories.reduce((acc, category) => {
            acc[category.id] = { isEditing: false, tempName: category.name };
            return acc;
        }, {});
        setEditStates(newEditStates);
    }, [categories]);

    const handleAvatarClick = (imageUrl) => { // 이미지 미리보기 열기
        setSelectedImageUrl(imageUrl);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => { // 이미지 미리보기 닫기
        setOpenDialog(false);
    };

    const handleEdit = (id) => { // 카테고리 이름 변경 모드 시작
        setEditStates(prev => ({
            ...prev,
            [id]: { ...prev[id], isEditing: true }
        }));
    };

    const handleSave = async (id) => { // 카테고리 이름 변경 저장
        const errMsg = 'Error : modifyCategory';
        const newName = editStates[id].tempName;
        const formData = new FormData();
        formData.append('name', newName);
        formData.append('categoryId', id);

        try {
            const cookies = new Cookies();
            const accessTkn = await cookies.get('accessToken');
            const refreshTkn = await cookies.get('refreshToken');
            if (!accessTkn || !refreshTkn) {
                console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
                alert('로그아웃 되었습니다.');
                navigate('/login', { replace: true });
                return;
            }

            const response = await postRequestApi(API.modifyCategory, formData, errMsg, navigate, accessTkn, refreshTkn,'PUT');
            if (response.status === 200) {
                reload(); // Reload categories to reflect the change
            } else {
                console.error("Failed to save category");
            }
        } catch (error) {
            console.error("Error saving category", error);
        }

        setEditStates({
            ...editStates,
            [id]: { isEditing: false, tempName: newName }
        });
    };

    const handleCancel = (id) => { // 카테고리 이름 변경 취소
        const originalName = categories.find(category => category.id === id).name;
        setEditStates(prev => ({
            ...prev,
            [id]: { isEditing: false, tempName: originalName }
        }));
    };
    const handleChange = (id, newName) => { // 카테고리 이름 변경
        setEditStates(prev => ({
            ...prev,
            [id]: { ...prev[id], tempName: newName }
        }));
    };


    const deleteCategory = async (id) => { // 카테고리 삭제
        const errMsg = 'Error : getCategoryList';

        try {
            const cookies = new Cookies();
            const accessTkn = await cookies.get('accessToken');
            const refreshTkn = await cookies.get('refreshToken');

            const response = await postRequestApi(API.deleteCategory, { categoryId: id },errMsg, navigate, accessTkn, refreshTkn, 'DELETE');
        if (response.status === 200) {
            reload();
        } else {
            console.error(errMsg, '지정되지 않은 에러');
        }
        } catch (error) {
        console.error(errMsg, error);
        }
    };

  return (
    <>
        <Box sx={{ overflowY: 'scroll',  '&::-webkit-scrollbar': { display: 'none' }}}>
            {categories.length === 0 ? (
                <Typography sx={{ mt: 2 }}>카테고리가 존재하지 않습니다.</Typography>
            ) : (
                categories.map((category) => (
                    <Box key={category.id} sx={{ ...categoryListStyle, alignItems: 'center' }}>
                        <Avatar
                            src={`${category.imageUrl}0`}
                            alt={category.name}
                            sx={{ width: 50, height: 50, mr: 2 }}
                            onClick={() => handleAvatarClick(`${category.imageUrl}0`)}
                        />
                        {editStates[category.id] && editStates[category.id].isEditing ? (
                            <TextField
                                value={editStates[category.id].tempName}
                                onChange={(e) => handleChange(category.id, e.target.value)}
                                variant="outlined"
                                size="small"
                                sx={{ flexGrow: 1, mr: 2 }}
                            />
                        ) : (
                            <Typography sx={{ flexGrow: 1 }}>{category.name}</Typography>
                        )}
                        {editStates[category.id] && editStates[category.id].isEditing ? (
                            <>
                                <IconButton onClick={() => handleSave(category.id)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={() => handleCancel(category.id, category.name)}>
                                    <ClearIcon />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton onClick={() => handleEdit(category.id)}>
                                <EditIcon />
                            </IconButton>
                        )}
                        <IconButton onClick={() => deleteCategory(category.id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Box>
                ))
            )}
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <img src={selectedImageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </Dialog>
        
    </>
  );
}
