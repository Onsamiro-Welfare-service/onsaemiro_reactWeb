// @mui
import PropTypes from 'prop-types';

import { useState } from 'react'; 

// icons

// components
import { Box, Grid, Modal, Tab, Button } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Button

import UserAnswerCard from './AnswerModalCard';
import UserAnswerHeader from './AnswerModalHeaders';
import UserAnswerModifyProfile from './AnswerModalModifyProfile';
import ModifyForm from './AnswerModalModifyForm';

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
};

UserAnswerModal.propTypes = {
    click: PropTypes.bool,
    close: PropTypes.func,
    data: PropTypes.object,
};




export default function UserAnswerModal({click, close, data }){
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

  const [url, setUrl] = useState(null);
  console.log(url);
  
  return (
      <>
        
        <Modal
          open={click}
          onClose={close}
          aria-labelledby="UserAnswerModal"
          aria-describedby="can read user answered survey data"
        >
          <Box sx={style} id="UserAnswer">

            {/* 답변창 헤더 */}
            <UserAnswerHeader userData={data} dateSet={handleDateChange} dateValue={answerDate} />

              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="답변 기록" value="1" />
                    <Tab label="답변 통계" value="2" />
                    <Tab label="개인정보 변경" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" 
                  sx={{ 
                    maxHeight:'600px',
                    overflow: 'auto',
                    '&:: -webkit-scrollbar':{
                      display: 'none'
                    } 
                  }}>
                  
                  <UserAnswerCard answerDate={answerDate} />

                </TabPanel>
                <TabPanel value="2">준비중입니다.</TabPanel>
                <TabPanel value="3">
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <span style={{ fontSize: '18px', fontWeight:'bold' }}>프로필 사진</span>
                      <UserAnswerModifyProfile url={setUrl} />
                    </Grid>
                    <Grid item xs={7}>
                      <span style={{ fontSize: '18px', fontWeight:'bold' }}>사용자 정보</span>
                      <ModifyForm userData={data}/>
                    </Grid>
                    <Grid item xs={10} />
                    <Grid item xs={2} mt={5}>
                    <Button variant='outlined' 
                      sx={{
                        ml:'15px',
                        mb:'10px',
                        fontSize: '20px',
                      }}>변경하기</Button>
                    </Grid>
                    
                  </Grid>
                  
                  
                </TabPanel>
              </TabContext>
          </Box>
        </Modal>
      </>
    );
}