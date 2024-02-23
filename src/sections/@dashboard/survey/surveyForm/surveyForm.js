import PropTypes from 'prop-types';

import { useState } from 'react';

import {
    Box,
    Button
} from '@mui/material';

import SurveySelectForm from './surveySelectForm';
import SurveyInputForm from './surveyInputForm';
import PreviewSurveySlide from '../previewSurvey/previewSurveySlide';

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

SurveyForm.propTypes = {
    status: PropTypes.bool,
    mode: PropTypes.bool,
    data: PropTypes.object,
}


export default function SurveyForm({status, mode, data}) {
    const initialInputs = data === null ? {
        category: 1,
        level: 0,
        type: '0',
        question: { text: '', fileUrl: null },
        answers: [{ text: '', fileUrl: null }, { text: '', fileUrl: null }],
    }: data;
    
    const [inputs, setInputs] = useState(initialInputs);

    const [modalPreview, setPreview] = useState(false);
    const prevClick = () => setPreview(!modalPreview);

    const handleSubmit = () => {
        setPreview(false); // 미리보기 닫기
        // 여기서 입력 데이터 처리
        console.log(inputs); // 예: 입력된 데이터를 콘솔에 출력
        // 서버로 데이터 전송 또는 기타 처리
        const tt = mode ? '새로운 질문이 추가되었습니다.' : '질문이 수정되었습니다.';
        alert(tt);
        setInputs(initialInputs);   // 입력 초기화
    };

    return (
        <Box sx={style} display={status ? 'block':'none'}>
            <Box sx={{width: '532px',height: '673px', overflow:'hidden'}}>
                <Box sx={{display:modalPreview? 'none':'block'}}>
                    <span style={{fontSize: '24px', fontWeight:'bold'}}>{mode ? '새로운 질문 생성하기':'질문 수정하기'}</span>
                    <Button disabled variant='outlined' sx={{float:'right', margin:'5px',}} display={mode ? 'block':'none'}>설정</Button>

                    <SurveySelectForm inputs={inputs} setInputs={setInputs}/>
                    <SurveyInputForm inputs={inputs} setInputs={setInputs}/>
                </Box>
            
                
                <PreviewSurveySlide status={modalPreview} data={inputs} />
            </Box>

            <Button variant='contained' sx={{float:'right', mt:'15px'}} onClick={handleSubmit}  disabled={inputs.type === '0'}>{mode ? '추가하기':'수정하기'}</Button>
            <Button variant='outlined' sx={{width:'88px', float:'right', mt:'15px', mr:'10px'}} onClick={prevClick} disabled={inputs.type === '0'}>{modalPreview? '닫기':'미리보기'}</Button>
        </Box>
    ); 
}