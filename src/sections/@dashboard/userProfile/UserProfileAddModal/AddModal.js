// @mui
// import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

// components
import { Box, Typography, Modal, Button } from "@mui/material";
import FormComponent from './AddModalInputForms';
import ProfileImg from './AddModalProfilePhoto';
// import { getCookie } from '../../../auth/cookie/cookie';
import { multiFormRequestApi, postRequestApi } from '../../../../apiRequest';
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
    reload: PropTypes.func
};




export default function UserAddModal({click, close, reload }){
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [imgURL, setImgURL] = useState(null);
    const managerId = cookies.get('managerId');
    const departmentId = cookies.get('departmentId')
    const initData = {
      "name": "",
      "managerId": managerId,
      "departmentId": departmentId,
      "address": "",
      "phoneNumber": "",
      "birth": "2024-01-01",
      "userLevel": 1
    }
    const [inputData, setInputData] = useState(initData);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const submitData = async () => {
        const errMsg = 'Error : getUserProfiles';
        const requestData = {
          request: JSON.stringify(inputData),
          images: imgURL
        }
        
        try {
          const accessTkn = await cookies.get('accessToken');
          const refreshTkn = await cookies.get('refreshToken'); // accessTkn, refreshTkn
          if (!accessTkn || !refreshTkn) {
            console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
            alert('로그아웃 되었습니다.');
            navigate('/login', { replace: true });
            return;
        }
          const response1 = await multiFormRequestApi(API.userProfileCreate, requestData, errMsg, navigate, accessTkn, refreshTkn);
          if (response1.status === 200) { // userId가 성공적으로 반환되었을 때만 두 번째 요청 실행
            const userId = response1.data.id;
            const config = JSON.stringify({ userId, categoryIdList: selectedCategory });
            const response2 = await postRequestApi(API.userCategoryCreate, config, errMsg, navigate, accessTkn, refreshTkn);

            if (response2.status === 200) {
              alert('성공적으로 등록되었습니다.');
            } else {
              alert('프로필을 성공적으로 추가했으나 카테고리 등록에 실패했습니다.');
            }
            setInputData(initData); 
            close();
            reload();
          } else { // 첫 번째 요청 실패 처리
            alert('프로필 생성에 실패했습니다.');
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
                <FormComponent data={inputData} setData={setInputData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

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