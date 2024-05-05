// @mui
import PropTypes from 'prop-types';
import { useState } from 'react'; // useEffect 
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

// icons

// components
import { Box, Grid, Modal, Tab, Button } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Button

import UserAnswerPanel from './AnswerPanel/Answer';
import UserAnswerHeader from './AnswerModalHeaders';
import UserAnswerModifyProfile from './ModifyPanel/ModifyProfile';
import ModifyForm from './ModifyPanel/ModifyForm';

import { multiFormRequestApi, postRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink';
// import { getCookie } from '../../../auth/cookie/cookie';


const style = {
    width: '85%',
    height: '80%',
    maxWidth: '1300px',
    maxHeight: '770px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    '&:: -webkit-scrollbar':{
      display: 'none'
    } 
};

UserAnswerModal.propTypes = {
    click: PropTypes.bool,
    close: PropTypes.func,
    data: PropTypes.object,
    reload: PropTypes.func
};




export default function UserAnswerModal({ click, close, data, reload }){
  // data는 유저 정보값을 가지고 있음

  // 날짜 관련 변수
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; 
  const [answerDate, setAnswerDate] = useState(formattedDate);
  const handleDateChange = (event) => {
    setAnswerDate(event.target.value);
  };

  // 탭 관련 변수
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 유저 프로필 데이터 관련 변수
  const [imgUrl, setImgUrl] = useState({ imageUrl: `${data.imageUrl}0`});
  const [userData, setUserData] = useState(data);
  //  const [userCategory, setUserCategory] = useState(data.categoryList); 

  const navigate = useNavigate();

  const handleModify = async() => {
    const errMsg = 'Error : handleModify';
    if (data === userData) { 
      alert('변경된 사항이 없습니다.');
      return; 
    }
    const formData = new FormData();

    formData.append('request', JSON.stringify({
      id: data.id,
      name: data.userName === userData.userName ? "" : userData.userName,
      managerId: 0,
      address: data.userAddress === userData.userAddress ? "" : userData.userAddress,
      birth: data.userBirth === userData.userBirth ? "" : userData.userBirth,
      phoneNumber: data.phoneNumber === userData.phoneNumber ? "" : userData.phoneNumber,
      level: data.userLevel === userData.userLevel ? 0 : Number(userData.userLevel)
    }));
    if (imgUrl !== null && (imgUrl.imageUrl !== `${data.imageUrl}0`) ) {
      formData.append('images', imgUrl);
    }

    try {
      const cookies = new Cookies();
      const accessTkn = await cookies.get('accessToken');
      const refreshTkn = await cookies.get('refreshToken'); // 
      if (!accessTkn || !refreshTkn) {
        console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
        alert('로그아웃 되었습니다.');
        navigate('/login', { replace: true });
        return;
    }
      const response = await multiFormRequestApi(API.userProfileUpdate, formData, errMsg, navigate, accessTkn, refreshTkn, "PUT");
      if (response.status === 200) {
        alert('성공적으로 변경되었습니다.');
        reload();
        close();
      } else {
        console.error(errMsg, '지정되지 않은 에러');
      }
    } catch (error) {
      console.error(errMsg, error);
    }
  }

  const deleteUserProfile = async () => {
    const errMsg = 'Error : deleteUserProfile';
    const config = { userId: userData.id };
    
    try {
      const cookies = new Cookies();
      const accessTkn = await cookies.get('accessToken');
      const refreshTkn = await cookies.get('refreshToken'); // 
      if (!accessTkn || !refreshTkn) {
        console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
        alert('로그아웃 되었습니다.');
        navigate('/login', { replace: true });
        return;
      }
      const response = await postRequestApi(API.deleteUserProfile, config ,errMsg, navigate, accessTkn, refreshTkn, "DELETE");
      if (response.status === 200) {
        window.location.reload();
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
          aria-labelledby="UserAnswerModal"
          aria-describedby="can read user answered survey data"
        >
          <Box sx={style} id="UserAnswer" overflow='auto'>

            {/* 답변창 헤더 */}
            <UserAnswerHeader userData={userData} dateSet={handleDateChange} dateValue={answerDate} />

            {/* 탭 */}
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="답변 기록" value="1" />
                  <Tab label="답변 통계" value="2" />
                  <Tab label="개인정보 변경" value="3" />
                </TabList>
              </Box>

              {/* 답변 조회 패널 */}
              <TabPanel value="1">
                <UserAnswerPanel userId={userData.id} answerDate={answerDate} />
              </TabPanel>

              { /* 답변 통계 패널 */}
              <TabPanel value="2">준비중입니다.</TabPanel>

              {/* 프로필 변경 패널 */}
              <TabPanel value="3" sx={{overflow:'hidden'}}>
                <Grid container spacing={2} >
                  <Grid item xs={5}>
                    <span style={{ fontSize: '18px', fontWeight:'bold' }}>프로필 사진</span>
                    <UserAnswerModifyProfile img={imgUrl}  setImg={setImgUrl}  />
                  </Grid>
                  
                  <Grid item xs={7}>
                    <span style={{ fontSize: '18px', fontWeight:'bold' }}>사용자 정보</span>
                    <ModifyForm userData={userData} setUserData={setUserData} />
                  </Grid>
                  <Grid item xs={10} mt={5} >
                    <Button variant='outlined' sx={{ ml:'15px', mb:'10px', fontSize: '20px', float:'left'}}  color="error" onClick={()=>{deleteUserProfile()}}> 프로필 삭제</Button>
                  </Grid>
                  <Grid item xs={2} mt={5}>
                    <Button variant='outlined' sx={{ ml:'15px', mb:'10px', fontSize: '20px'}} onClick={handleModify}>변경하기</Button>
                  </Grid>
                </Grid>

              </TabPanel>
            </TabContext>
          </Box>
        </Modal>
      </>
    );
}