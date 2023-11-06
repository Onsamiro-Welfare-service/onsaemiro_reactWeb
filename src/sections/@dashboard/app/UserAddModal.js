// @mui
// import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
// // import { alpha, styled } from '@mui/material/styles';

// // icons
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import AccessibleIcon from '@mui/icons-material/Accessible';


// import { Card, Typography, Box, Grid } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react'; 
import { Box, Typography, Modal, Button, Avatar } from "@mui/material";
import PropTypes from 'prop-types';

const style = {
    width: '600px',
    height: '630px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

UserAddModal.propTypes = {
    click: PropTypes.bool,
    close: PropTypes.func,
};

export default function UserAddModal({click, close }){
    const [profilePhoto, setProfilePhoto] = useState(null);

    // 사용자가 사진을 선택했을 때 호출될 핸들러
    const handlePhotoChange = (event) => {
        if (event.target.files[0]) {
        setProfilePhoto(URL.createObjectURL(event.target.files[0]));
        }
    };

    const addPhotoBtn = () => {
        // 버튼 클릭 시 input 클릭 이벤트를 트리거합니다.
        const fileInput = document.getElementById('raised-button-file');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <>
          
          <Modal
            open={click}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">사용자 프로필 추가 </Typography>

                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center', 
                    marginY: 3
                    }}>
                    <Avatar sx={{ width: 150, height: 150 }} src={ profilePhoto ||"/static/images/avatar/1.jpg"} />
                </Box>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handlePhotoChange}
                />
                <Button
                    component="span"
                    startIcon={<AddAPhotoIcon sx={{ width: '40px', height: '40px', position: 'absolute' }}/>}
                    onClick={addPhotoBtn}
                    sx={{ 
                        position: 'absolute', 
                        left: '350px', 
                        top: '200px',
                    }}
                />
                {/* {profilePhoto && <Avatar src={profilePhoto} alt="프로필 사진" />} */}
            </Box>
          </Modal>
        </>
      );
      
}