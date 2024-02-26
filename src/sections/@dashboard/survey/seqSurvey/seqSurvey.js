import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { testSurveyList, initialSurveyData } from '../constants';

import CategorySelect from './seqSurveyCategorySelect';
import SeqSurveyForms  from './seqSurveyForms'; 
import SeqSurveyButton from './seqSurveyButton';

const style = {
    width: '800px',
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
  const [selectedCategory, setSelectedCategory] = useState(0); // 선택된 카테고리
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  // 카테고리 선택 시 해당 카테고리에 해당하는 질문만 표시
  useEffect(() => {
    if (selectedCategory === '') {
      setDisplayedSurveyList(initialSurveyData);
    } else {
      const filteredList = surveyData.filter(item => item.category === selectedCategory);
      if (filteredList.length === 0) 
        setDisplayedSurveyList(
          initialSurveyData.map(item => ({
            ...item,
            question: { ...item.question, text: '선택된 카테고리에 해당하는 질문이 없습니다.' }
          }))
        );
      else 
        setDisplayedSurveyList(filteredList);
        
    }
  }, [selectedCategory, surveyData]);

  // 질문 목록에서 아이템을 이동
  const moveItem = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newSurveyData = [...surveyData]; // 전체 목록 복사
    const displayedIndex = surveyData.indexOf(displayedSurveyList[index]); // 실제 surveyData에서의 위치
    const targetDisplayedIndex = surveyData.indexOf(displayedSurveyList[newIndex]); // 실제 surveyData에서의 위치

    if (newIndex < 0 || newIndex >= displayedSurveyList.length) return; // 범위를 벗어나면 아무것도 하지 않음

    [newSurveyData[displayedIndex], newSurveyData[targetDisplayedIndex]] = [newSurveyData[targetDisplayedIndex], newSurveyData[displayedIndex]]; // 실제 surveyData에서 위치 변경
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
  };

  // 대화 상자에서 "취소" 선택 시
  const handleClose = () => {   
    setConfirmOpen(false);
  };

  return (
    <Box sx={style} display={status ? 'block':'none'}>
      <span style={{fontSize: '24px', fontWeight:'bold'}}>질문 순서 변경하기</span>

      {/* 카테고리 선택 */}
      <CategorySelect category={selectedCategory} setCategory={setSelectedCategory} />
      
      {/* 질문 목록 */}
      <SeqSurveyForms display={displayedSurveyList} move={moveItem} />

      {/* 변경하기 버튼 */}
      <SeqSurveyButton open={confirmOpen} close={handleClose} click={handleClickOpen} confirm={handleConfirm} />

    </Box>
  );
}