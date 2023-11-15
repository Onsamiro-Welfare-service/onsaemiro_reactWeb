// @mui
import PropTypes from 'prop-types';
import * as React from 'react';
// import { useState } from 'react'; 

// icons

// components
import { Box, Typography, Modal, Tab, Button  } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// Button


const style = {
    width: '1300px',
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

UserAnswerModal.propTypes = {
    click: PropTypes.bool,
    close: PropTypes.func,
    data: PropTypes.array
};


export default function UserAnswerModal({click, close, data }){
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <>
        
        <Modal
          open={click}
          onClose={close}
          aria-labelledby="UserAnswerModal"
          aria-describedby="can read user answered survey data"
        >
          <Box sx={style} id="UserAnswer">
              <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight:'bold'}}>
                <span style={{ fontSize: '24px' }}>{data[0]}</span>
                <span style={{ fontSize: '20px', marginLeft:'10px' }}>{data[1]}</span>
                <input type="date" style={{ fontSize:'20px', fontWeight:'bold', border:'none', backgroundColor:'transparent', marginLeft:'20px'}}/>
                <Button variant='outlined' 
                  sx={{
                    ml:'15px',
                    mb:'10px',
                    fontSize: '20px',
                  }}>로그인코드</Button>
              </Typography>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="답변 기록" value="1" />
                    <Tab label="답변 통계" value="2" />
                    <Tab label="개인정보 변경" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  ㅇㅁㄴㅇㅁ
                  
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
          </Box>
        </Modal>
      </>
    );
}