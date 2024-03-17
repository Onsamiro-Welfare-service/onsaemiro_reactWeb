import PropTypes from 'prop-types';
import { useEffect, useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button
} from '@mui/material';

import SurveySelectForm from './modifySurveySelectForm';
import SurveyInputForm from './modifySurveyInputForm';
import PreviewSurveyModal from '../previewSurvey/previewSurveyModal';
import { multiFormRequestApi, getRequestApi } from '../../../../apiRequest';
import { API } from '../../../../apiLink';
import { getCookie } from '../../../auth/cookie/cookie';

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

ModifySurveyForm.propTypes = {
    status: PropTypes.bool,
    mode: PropTypes.bool,
    data: PropTypes.object,
    closeModal: PropTypes.func,
    reload: PropTypes.func,
}


export default function ModifySurveyForm({status, mode, data, closeModal, reload}) {
    const navigate = useNavigate();
    const initialInputs = data === null ? {
        id: 1,
        categoryId: 1,
        level: 0,
        type: '0',
        question: '',
        imageUrl: null,
        answers: [{ description: '', imageUrl: null }, { description: '', imageUrl: null }],
    }: data;
    
    const [inputs, setInputs] = useState(initialInputs);
    const [prevInputs, setPrevInputs] = useState(null);

    const [modalPreview, setPreview] = useState(false);
    const prevClick = () => setPreview(!modalPreview);


    const valuesChanged = useCallback((current, previous) => 
        Object.keys(current).some(key => JSON.stringify(current[key]) !== JSON.stringify(previous[key])),
        []);
    
    const handleSubmit = async() => {
        const errMsg = 'Error : [ModifySurveyForm] handleSubmit';
        const formData = new FormData();
    
        if (!valuesChanged(inputs, prevInputs)) { return; } // 변경된 값이 없으면 실행하지 않음

        formData.append('request', JSON.stringify({
            surveyId: inputs.id,
            question: inputs.question,
            categoryId: inputs.categoryId,
            level: inputs.level !== prevInputs.level ? inputs.level : 0,
            // type: inputs.type,
            questionImage: inputs.imageUrl !== prevInputs.imageUrl,
            answers: inputs.answerList.map(answer => ({
                answerId: answer.id,
                answers: answer.description,
                imageCk: answer.imageUrl !== prevInputs.answerList[inputs.answerList.indexOf(answer)].imageUrl,
            }))
        }));

        if (inputs.imageUrl !== null && inputs.imageUrl !== `${data.imageUrl}/0`) { // 질문 이미지 추가
            if (inputs.imageUrl !== prevInputs.imageUrl){
                formData.append('images', inputs.imageUrl);
            }
        }  

        inputs.answerList.forEach((answer, index) => { // 답변 이미지 추가
            if (answer.imageUrl !== null && answer.imageUrl !== '' && answer.imageUrl !== `${data.answerList[index].imageUrl}/${index+1}`) {
                if (answer.imageUrl !== prevInputs.answerList[inputs.answerList.indexOf(answer)].imageUrl){
                    formData.append('images', answer.imageUrl);
                }
            }
        });
        
        try {
            const response = await multiFormRequestApi(API.modifySurvey, formData, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'), "PUT");
            if (response.status === 200) {
                // 성공적으로 등록
                console.log('[ModifySurveyForm]', response.data);
                alert('질문이 수정되었습니다.');

                // 입력 초기화
                reload();
                setPreview(false); // 미리보기 닫기
                setInputs(initialInputs);   // 입력 초기화
                closeModal();
              } else {
                console.error(errMsg, '지정되지 않은 에러');
                alert('질문 수정에 실패했습니다. 다시 시도해주세요');
              }
        } catch (error) {
            console.error(errMsg, error);
            alert('질문 수정에 실패했습니다. 다시 시도해주세요');
        }
    };

    useEffect(() => {
        const fetchPrevData = async () => {
          // 이전 데이터를 가져오는 로직
          try {
            const response = await getRequestApi(`${API.getSurveyData}/${data.id}`, null, 'Error Message', navigate, getCookie('accessToken'), getCookie('refreshToken'));
            setPrevInputs(response.data);
          } catch (error) {
            console.error('Error fetching previous data', error);
          }
        };
    
        if (data) {
          fetchPrevData();
        }
    }, [data, navigate]);

    return (
        <Box sx={style} display={status ? 'block':'none'}>
            <Box sx={{width: '532px',height: '673px', overflow:'hidden'}}>
                <Box sx={{display:modalPreview? 'none':'block'}}>
                    <span style={{fontSize: '24px', fontWeight:'bold'}}>{mode ? '새로운 질문 생성하기':'질문 수정하기'}</span>
                    <Button disabled variant='outlined' sx={{float:'right', margin:'5px',}} display={mode ? 'block':'none'}>설정</Button>

                    <SurveySelectForm inputs={inputs} setInputs={setInputs}/>
                    <SurveyInputForm inputs={inputs} setInputs={setInputs}/>
                </Box>
            
                
                <PreviewSurveyModal status={modalPreview} data={inputs} />
            </Box>

            <Button variant='contained' sx={{float:'right', mt:'15px'}} onClick={handleSubmit}  disabled={inputs.type === 0}>{mode ? '추가하기':'수정하기'}</Button>
            <Button variant='outlined' sx={{width:'88px', float:'right', mt:'15px', mr:'10px'}} onClick={prevClick} disabled={inputs.type === 0}>{modalPreview? '닫기':'미리보기'}</Button>
        </Box>
    ); 
}