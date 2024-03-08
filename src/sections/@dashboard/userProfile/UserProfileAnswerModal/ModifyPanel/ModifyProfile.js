// @mui
import PropTypes from 'prop-types';
import { useState } from 'react'; 
// import { keyframes } from '@emotion/react';

// icons
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

// components
import { Box, Button, IconButton } from "@mui/material";

import ProfileAvatar from '../../defaultProfileIcon';


ProfileImg.propTypes = {
    img: PropTypes.object,
    setImg: PropTypes.func,
};

const name = 'modifyProfile';


export default function ProfileImg ({img, setImg}){
    if (img === undefined) { 
        img = null; 
    }
    const [profilePhoto, setProfilePhoto] = useState(img.imageUrl);

    // 사용자가 사진을 선택했을 때 호출될 핸들러
    const handlePhotoChange = (event) => {
        if (event.target.files[0]) {
            setProfilePhoto(URL.createObjectURL(event.target.files[0]));
            setImg(event.target.files[0]); // object로 저장
        } else {
            setImg(null);
            console.log('이미지가 없습니다.', img);
        }
    };

    const addPhotoBtn = () => {// 버튼 클릭 시 input 클릭 이벤트를 트리거합니다.
        const fileInput = document.getElementById(`${name}_filebtn`);
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <>
            <Box id={name} sx={{ width: '532px', height: '150px', mt: '24px', mb: '24px' }}>
                <Box id={`${name}_icon`} sx={{ display: 'flex', marginY: 3 }}>
                    <ProfileAvatar profilePhoto={ profilePhoto }/>
                </Box>

                <input id={`${name}_filebtn`}
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple
                    type="file"
                    onChange={handlePhotoChange}
                />

                <Button id={`${name}_addBtn`} 
                    startIcon={ <AddAPhotoIcon  sx={{ width: '40px',  height: '40px', ml: '5px', mt: '2px',color: 'white'}}/>}
                    onClick={addPhotoBtn}
                    sx={{ 
                        position: 'absolute', 
                        left: '150px', 
                        top: '310px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50px',
                        backgroundColor: 'darkgray',
                        border: '2px solid white',
                        ':hover':{
                            backgroundColor: 'gray'
                        },
                        display: profilePhoto ? 'none' : 'block',
                    }}
                />

                <IconButton 
                    id={`${name}_deleteBtn`}
                    onClick={() => setProfilePhoto(null)} 
                    sx={{ postion: 'absolute', left: '130px', top: '-190px', visibility: profilePhoto ? 'visible' : 'hidden' }}>
                        <CloseIcon color='black'/>
                </IconButton>
            </Box> 
        </>
      );
      
}