import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import {
    Modal,
    Box,
    Button
} from '@mui/material';

import SurveySelectForm from './addSurveySelectForm';
import SurveyInputForm from './addSurveyInputForm';
import ModalPreviewSurveySlide from '../previewSurvey/previewSurveySlide';

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

ModalAddSurvey.propTypes = {
    status: PropTypes.bool,
    close: PropTypes.func
}

export default function ModalAddSurvey({status, close}) {

    const initailInputs = {
        category: 1,
        level: 0,
        type: '0',
        question: { text: '', fileUrl: null },
        answers: [{ text: '', fileUrl: null }, { text: '', fileUrl: null }, { text: '', fileUrl: null }],
    }
    
    const [inputs, setInputs] = useState(initailInputs);

    const [modalPreview, setPreview] = useState(false);
    const prevClick = () => setPreview(!modalPreview);

    const handleSubmit = () => {
        // 여기서 입력 데이터 처리
        console.log(inputs); // 예: 입력된 데이터를 콘솔에 출력
        // 서버로 데이터 전송 또는 기타 처리
        alert('새로운 질문이 추가되었습니다.');
        setInputs(initailInputs);   // 입력 초기화
    };

    useEffect(() => {
        let count = 2;
        switch(inputs.type){
            case 1:
                count = 2; break;
            case 2: 
                count = 3; break;
            case 3:
                count = 4; break;
            default:
                count = 2;
        }
        const updatedAnswers = inputs.answers.slice(0, inputs.type); // answers 배열 조절
    
        // 필요한 경우 배열 확장
        while (updatedAnswers.length < count) {
          updatedAnswers.push({ text: '', fileUrl: null });
        }
    
        setInputs((prevInputs) => ({ ...prevInputs, answers: updatedAnswers }));// eslint-disable-next-line
      }, [inputs.type, inputs.answers.length]); 


    return (
        <>
        <Modal
            open={status}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{width: '532px',height: '673px', overflow:'hidden'}}>
                    <Box sx={{display:modalPreview? 'none':'block'}}>
                    <span style={{fontSize: '24px', fontWeight:'bold'}}>새로운 질문 생성하기</span>
                    <Button disabled variant='outlined' sx={{float:'right', margin:'5px',}}>설정</Button>
                    <SurveySelectForm 
                        inputs={inputs} setInputs={setInputs}
                    />
                
                        <SurveyInputForm inputs={inputs} setInputs={setInputs}/>
                    </Box>
                
                    
                    <ModalPreviewSurveySlide status={modalPreview} data={inputs} />
                </Box>

                <Button variant='contained' sx={{float:'right', mt:'15px'}} onClick={handleSubmit}  disabled={inputs.type === '0'}>추가하기</Button>
                <Button variant='outlined' sx={{width:'88px', float:'right', mt:'15px', mr:'10px'}} onClick={prevClick} disabled={inputs.type === '0'}>{modalPreview? '닫기':'미리보기'}</Button>
            </Box>
        </Modal>
        </>
    ); 
}