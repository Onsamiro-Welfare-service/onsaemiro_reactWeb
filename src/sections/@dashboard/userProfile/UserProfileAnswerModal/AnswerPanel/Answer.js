import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, FormControlLabel, Typography } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';

import AnswerCard from './AnswerCard';
import { API } from '../../../../../apiLink';
import { getDefaultRequestApi } from '../../../../../apiRequest';
import { getCookie } from '../../../../auth/cookie/cookie';

UserAnswerPanel.propTypes = {
    userId: PropTypes.number,
    answerDate: PropTypes.string
};

    

export default function UserAnswerPanel({ userId, answerDate }){
    const [surveyAnswers, setUserSurveyAnswers] = useState({ "기본값": []}); 
    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getSurveyAnswers = async () => {
        const errMsg = 'Error : getSurveyAnswers';

        try {
            const response = await getDefaultRequestApi(`${API.userSurveyAnswer}/${userId}/${answerDate}`, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
            if (response.status === 200 && response.data.answerList !== undefined) {
                setUserSurveyAnswers(response.data.answerList);
                // console.log(response.data.answerList);
            } else {
            console.error(errMsg, '지정되지 않은 에러');
            }
        } catch (error) {
            console.log(errMsg, error);
        }
    };

    getSurveyAnswers();
    }, [navigate, userId, answerDate]);


    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '15px' }}>
                <Typography variant='h5' sx={{mr:'35px'}}>
                    {answerDate} 답변
                </Typography>
                    <FormControlLabel
                        control={<Checkbox checked={showAll} onChange={() => setShowAll(!showAll)} />}
                    label="모든 카테고리 보이기"
                />
            </Box>
            <Grid container spacing={2}>
                {Object.entries(surveyAnswers).map(([category, answers]) => (
                    (answers.length > 0 || showAll) && (
                        <AnswerCard key={category} surveyData={answers} category={category} />
                    )
                ))}
                {!showAll && Object.keys(surveyAnswers).every(category => surveyAnswers[category].length === 0) && (
                    <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>해당 날짜에 대한 사용자 답변이 존재하지 않습니다.</Typography>
                )}
                     
            </Grid>
        </>
    );
}