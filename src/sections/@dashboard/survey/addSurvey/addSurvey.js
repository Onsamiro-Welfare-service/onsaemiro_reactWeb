import PropTypes from 'prop-types';

import { useState } from 'react';

import {
    Modal,
    Box,
    Button,
} from '@mui/material';

import SurveySelectForm from './addSurveySelectForm';
import SurveyInputForm from './addSurveyInputForm';

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
    
    const [category, setCategory] = useState('');
    const [surveyType, setSurveyType] = useState('');
    const [level, setLevel] = useState(-1);
    return (
        <Modal
            open={status}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <span style={{fontSize: '24px', fontWeight:'bold'}}>새로운 질문 생성하기</span>
                <Button disabled variant='outlined' sx={{float:'right', margin:'5px',}}>설정</Button>
                <SurveySelectForm 
                    category={category} setCategory={setCategory} 
                    type={surveyType} setType={setSurveyType}
                    level={level} setLevel={setLevel} 
                />
            
                <SurveyInputForm />

                <Button variant='contained' sx={{float:'right', mt:'15px'}} >추가하기</Button>
                <Button variant='outlined' sx={{float:'right', mt:'15px', mr:'10px'}} disabled>미리보기</Button>
            </Box>
        </Modal>
    ); 
}