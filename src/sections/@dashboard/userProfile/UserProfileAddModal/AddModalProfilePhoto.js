// @mui
import PropTypes from 'prop-types';
import { useState } from 'react'; 
// import { keyframes } from '@emotion/react';

// icons
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

// components
import { Box, Button, IconButton } from "@mui/material";
import ProfileAvatar from '../defaultProfileIcon';


ProfileImg.propTypes = {
    url: PropTypes.func
};

export default function ProfileImg ({url}){
    const [profilePhoto, setProfilePhoto] = useState(null);

    // 사용자가 사진을 선택했을 때 호출될 핸들러
    const handlePhotoChange = async (event) => {
        if (event.target.files[0]) {
            setProfilePhoto(URL.createObjectURL(event.target.files[0]));
            url(event.target.files[0]);
        }
    };

    const addPhotoBtn = () => {
        // 버튼 클릭 시 input 클릭 이벤트를 트리거합니다.
        const fileInput = document.getElementById('profilePhoto_filebtn');
        if (fileInput) {
            fileInput.click();
        }
    };
    return (
        <>
          
            <Box id="profilePhoto"
                sx={{
                    width: '532px',
                    height: '150px',
                    mt: '24px',
                    mb: '24px',
                }}
            >
                <Box id="profilePhoto_icon"
                    sx={{
                    display: 'flex',
                    justifyContent: 'center', 
                    marginY: 3
                    }}>
                    <ProfileAvatar profilePhoto={ profilePhoto }/>
                </Box>

                <input id="profilePhoto_filebtn"
                    accept="image/*"
                    style={{ display: 'none' }}
                    multiple
                    type="file"
                    onChange={handlePhotoChange}
                />

                <Button id="profilePhoto_addBtn"
                    
                    startIcon={<AddAPhotoIcon 
                        sx={{ 
                            width: '40px', 
                            height: '40px', 
                            ml: '5px',
                            mt: '2px',
                            color: 'white',
                            // animation: profilePhoto ? 'none' : `${sparkle} 1s infinite`
                        }}
                    />}
                    onClick={addPhotoBtn}
                    sx={{ 
                        position: 'absolute', 
                        left: '330px', 
                        top: '180px',
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


                <IconButton id="profilePhoto_deleteBtn"
                    onClick={() => setProfilePhoto(null)} 
                    sx={{ 
                        postion: 'absolute', 
                        left: '320px', 
                        top: '-190px',
                        visibility: profilePhoto ? 'visible' : 'hidden'
                    }}>
                    <CloseIcon color='black'/>
                </IconButton>
                

            </Box> 
        </>
      );
      
}