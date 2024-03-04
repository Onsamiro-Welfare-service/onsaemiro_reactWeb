// @mui
// import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

// icons

// components
import { Box, Typography, Modal, Button } from "@mui/material";
import FormComponent from './AddModalInputForms';
import ProfileImg from './AddModalProfilePhoto';
import { getCookie } from '../../../auth/cookie/cookie';
import { multiFormRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink';


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
    const navigate = useNavigate();
    const [imgURL, setImgURL] = useState(null);
    const [inputData, setInputData] = useState({
      "name": "",
      "managerId": getCookie('managerId'),
      "departmentId": 0,
      "address": "",
      "phoneNumber": "",
      "birth": "2024-01-01",
      "userLevel": 1
    });

    const submitData = async () => {
        const errMsg = 'Error : getUserProfiles';
        const requestData = {
          request: JSON.stringify(inputData),
          images: imgURL
        }
        
        try {
          const response = await multiFormRequestApi(API.userProfileCreate, requestData, errMsg, navigate);

          if (response.status === 200) {
            // 성공적으로 등록
            console.log('User Info:', response.data);
            alert('성공적으로 등록되었습니다.');
            close();
          } else {
            console.error(errMsg, '지정되지 않은 에러');
          }
        } catch (error) {
          console.error(errMsg, error);
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
            <Box sx={style} id="profileAdd">
                <Typography id="modal-modal-title" variant="h5" component="h2">사용자 프로필 추가 </Typography>
                <ProfileImg url={setImgURL} />
                <FormComponent data={inputData} setData={setInputData}/>

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