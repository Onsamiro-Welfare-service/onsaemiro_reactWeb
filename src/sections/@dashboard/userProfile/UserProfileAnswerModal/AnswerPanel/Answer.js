import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid  } from "@mui/material";



import AnswerCard from './AnswerCard';
import { API } from '../../../../../apiLink';
import { getDefaultRequestApi } from '../../../../../apiRequest';

UserAnswerPanel.propTypes = {
    userId: PropTypes.number,
    answerDate: PropTypes.string
};

    

export default function UserAnswerPanel({ userId, answerDate }){
    const [surveyAnswers, setUserSurveyAnswers] = useState([]); 
    // request API 관련 변수
    const navigate = useNavigate();

    useEffect(() => {
        const getSurveyAnswers = async () => {
        const errMsg = 'Error : getSurveyAnswers';
        setUserSurveyAnswers([
            { category: '건강', question: "편안하게 잠을 잘 잤나요?", answer: "네" },
            { category: '건강', question: "하루 30분 이상 규칙적인 운동을 하셨나요?", answer: "네" },
            { category: '건강', question: "지금 현재 아픈 곳이 있나요?", answer: "네" },
            { category: '안전', question: "복용하는 약은 잘 챙겨 먹었나요?", answer: "네" },
            { category: '안전', question: "안전하게 집에 도착했나요?", answer: "네" },
            { category: '안전', question: "안전하게 집에 도착했나요?", answer: "네"},
            { category: '안전', question: "안전하게 집에 도착했나요?", answer: "네"},
            { category: '통제', question: "안전하게 집에 도착했나요?", answer: "네"},
            
        ]);
        try {
            const response = await getDefaultRequestApi(`${API.userSurveyAnswer}/3/${userId}`, errMsg, navigate);
            if (response.status === 200 && response.data.surveyList !== undefined) {
                // setUserSurveyAnswers(response.data.surveyList);
                console.log(response.data.surveyList);
            } else {
            console.error(errMsg, '지정되지 않은 에러');
            }
        } catch (error) {
            console.log(errMsg, error);
        }
    };

    getSurveyAnswers();
  }, [navigate, userId]);
    return (
        <>
        <Typography variant='h5' sx={{mb:'15px'}}>{answerDate} 답변</Typography>
        <Grid container spacing={2}>
            <AnswerCard surveyData={surveyAnswers} />
        </Grid>
        </>
    );
}