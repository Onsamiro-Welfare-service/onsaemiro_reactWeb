import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import {
    Box,
    Grid,
    Select,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,

} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TestCategoryArr, testSurveyList, levelList, tagList } from '../constants';

 
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


ModalSeqSurvey.propTypes = {
    status: PropTypes.bool,
}

export default function ModalSeqSurvey({status}) {
  const [surveyData, setSurveyData] = useState(testSurveyList); // 전체 질문 목록
  const [displayedSurveyList, setDisplayedSurveyList] = useState([]); // 표시된 질문 목록
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 선택된 카테고리에 따라 displayedSurveyList를 업데이트합니다.
  useEffect(() => {
    if (selectedCategory === '') {
      setDisplayedSurveyList(surveyData);
    } else {
      const filteredList = surveyData.filter(item => item.category === selectedCategory);
      setDisplayedSurveyList(filteredList);
    }
  }, [selectedCategory, surveyData]);

  const moveItem = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= displayedSurveyList.length) return; // 범위를 벗어나면 아무것도 하지 않음

    const newSurveyData = [...surveyData]; // 전체 목록 복사
    const displayedIndex = surveyData.indexOf(displayedSurveyList[index]); // 실제 surveyData에서의 위치
    const targetDisplayedIndex = surveyData.indexOf(displayedSurveyList[newIndex]); // 실제 surveyData에서의 위치

    // 실제 surveyData에서 위치 변경
    [newSurveyData[displayedIndex], newSurveyData[targetDisplayedIndex]] = [newSurveyData[targetDisplayedIndex], newSurveyData[displayedIndex]]; 
    setSurveyData(newSurveyData); // 전체 목록 업데이트
  }

  // 대화 상자 열기
  const handleClickOpen = () => {
    setConfirmOpen(true);
  };

  // 대화 상자에서 "확인" 선택 시
  const handleConfirm = () => {
    console.log('변경 완료');
    setConfirmOpen(false);
    // 변경 로직을 여기에 추가
  };

  // 대화 상자에서 "취소" 선택 시
  const handleClose = () => {
    setConfirmOpen(false);
  };

  return (
    <Box sx={style} display={status ? 'block':'none'}>
      <span style={{fontSize: '24px', fontWeight:'bold'}}>질문 순서 변경하기</span>

      <Grid container padding={3} spacing={2}>
            {/* 카테고리 선택 */}
            <Grid item xs={4}>
                <span style={{fontSize: '18px', fontWeight:'bold', lineHeight:'2.7', paddingLeft: 0}}>카테고리 선택</span>
            </Grid>
            <Grid item xs={8}>
                <FormControl sx={{width:'70%'}}>
                    <InputLabel id="select-label" >선택하기</InputLabel>
                    <Select labelId='test' id='test'
                        value={selectedCategory}
                        label='카테고리'
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        {TestCategoryArr.data.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        <span style={{fontSize: '12px', fontWeight:'bold'}}>* 위에서부터 순서대로 적용됩니다.</span>
        <Box sx={{width:'100%', height: '510px', border:'1px solid black', padding:'15px'}}>
          {
            displayedSurveyList.map((data, index) => (
              <Box key={index} sx={{ margin: '0 0 8px 0', padding: 2, border: '1px solid black', borderRadius: '5px'}}>
                <Box sx={{ float:'left', marginRight:3, position:'relative', top:'-12px'}}>
                  {index !== 0 && 
                    <Box onClick={() => moveItem(index, 'up')} sx={{position: 'relative', top: index !== displayedSurveyList.length-1 ? '3px':'14px'}}>
                      <KeyboardArrowUpIcon/>
                    </Box>
                  }
                  
                  {index !== displayedSurveyList.length-1 && 
                    <Box onClick={() => moveItem(index, 'down')} sx={{position: 'relative', top: index !== 0 ? '-3px':'14px'}}>
                      <KeyboardArrowDownIcon />
                    </Box>    
                  }
                </Box>
                <span style={{fontSize: '18px', fontWeight:'bold'}}>{data.question.text}</span>
                
                <Box sx={{float:'right'}}>
                  <Chip label={levelList[data.level]} />
                  <Chip label={tagList[data.type]} />
                </Box>
              </Box>
            ))
          }
        </Box>

        <Button variant='contained' sx={{float:'right', mt:'15px'}} onClick={handleClickOpen}>변경하기</Button>
          <Dialog
          open={confirmOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"변경 확인"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                변경하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleConfirm} autoFocus>
                확인
              </Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
}