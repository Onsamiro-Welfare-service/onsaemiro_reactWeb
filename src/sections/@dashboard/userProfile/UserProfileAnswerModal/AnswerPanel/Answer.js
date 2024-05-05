import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';


import { Box, Grid, FormControlLabel, Typography } from '@mui/material';

import Checkbox from '@mui/material/Checkbox';

import AnswerCard from './AnswerCard';
import { API } from '../../../../../apiLink';
import { getDefaultRequestApi } from '../../../../../apiRequest';
// import { getCookie } from '../../../../auth/cookie/cookie';

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
                const cookies = new Cookies();
                const accessTkn = await cookies.get('accessToken');
                const refreshTkn = await cookies.get('refreshToken');
        
                // 쿠키 값이 undefined인 경우, 사용자에게 알리고 로그인 페이지로 리다이렉션
                if (!accessTkn || !refreshTkn) {
                    console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
                    alert('로그아웃 되었습니다.');
                    navigate('/login', { replace: true });
                    return;
                }
                const response = await getDefaultRequestApi(`${API.userSurveyAnswer}/${userId}/${answerDate}`, errMsg, navigate, accessTkn, refreshTkn);
                if (response.status === 200 && response.data.answerList !== undefined) {
                    setUserSurveyAnswers(response.data.answerList);
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