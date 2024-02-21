// @mui
import PropTypes from 'prop-types';
import { useState } from 'react'; 

// icons

// components
import { Box, Typography, Modal, Button } from "@mui/material";
import FormComponent from './AddModalInputForms';
import ProfileImg from './AddModalProfilePhoto';


const style = {
    width: '600px',
    height: '770px',
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
    const [imgURL, setImgURL] = useState(null);
    const submitData = () => {
        const name = document.getElementById("name-input").value;
        const address = document.getElementById("address-input").value;
        const birth = document.getElementById("birth-input").value;
        const phone = document.getElementById("phone-input").value;
        const level = document.getElementById("level-input").value;
        // const img = document.getElementById("profilePhoto_filebtn").value;
        // const imgURL = URL.createObjectURL(img[0]);
        const data = {
            "request": {
              "userName": name,
              "userAddress": address,
              "level": level,
              "userBirth": birth,
              "managerId": 0,
              "phoneNumber": phone,
              "department": 0
            },
            "images": imgURL
        };
        console.log(data);
          
    };

    return (
        <>
          
          <Modal
            open={click}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} id="profileAdd">
                <Typography id="modal-modal-title" variant="h5" component="h2">사용자 프로필 추가 </Typography>
                <ProfileImg url={setImgURL} />
                <FormComponent />

                <Button variant="contained" 
                    onClick={ submitData }
                    sx={{ 
                        width: '200px',
                        height: '50px',
                        marginLeft: '175px',
                        backgroundColor:"rgb(33,43,54,0.6)",
                        boxShadow: '0 8px 16px 0 rgba(33,43,54, 0.24)',
                        ':hover': { backgroundColor: "rgb(33,43,54)" } 
                    }}>
                    
                    등록하기
                </Button>    
            </Box>
          </Modal>
        </>
      );
}