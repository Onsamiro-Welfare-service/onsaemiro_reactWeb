import PropTypes from 'prop-types';

import { Box, Typography, Card, Divider, Grid  } from "@mui/material";

import CategoryIcon from '../../../../components/category/categoryIcon';

UserAnswerCard.propTypes = {
    userSurveyAnswers: PropTypes.object,
    answerDate: PropTypes.string
};

export default function UserAnswerCard({userSurveyAnswers, answerDate}){
    console.log(userSurveyAnswers);
    return (
        <>
        <Typography variant='h5' sx={{mb:'15px'}}>{answerDate} 답변</Typography>
        <Grid container spacing={2}>
        <Grid item xs={6}>
        <Card id='answerCategory_health' variant='outlined' sx={{padding:'20px', mt:'10px' }} >
            <Box sx={{
                width:'60px',
                height:'40px',
                border:'2px solid black',
                color:'black',
                fontWeight:'bold',
                fontSize:'20px',
                borderRadius:'10px',
                textAlign:'center',
                paddingTop:'4px',
                mb:'15px'
            }}>건강</Box>
            <Typography variant='h6' mt='5px'>편안하게 잠을 잘 잤나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>하루 30분 이상 규칙적인 운동을 하셨나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>지금 현재 아픈 곳이 있나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>복용하는 약은 잘 챙겨 먹었나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
        </Card></Grid>
        <Grid item xs={6}>
        <Card id='answerCategory_health' variant='outlined' sx={{padding:'20px', mt:'10px'}} >
            <CategoryIcon category='건강' />
            <Typography variant='h6' mt='5px'>편안하게 잠을 잘 잤나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>하루 30분 이상 규칙적인 운동을 하셨나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>지금 현재 아픈 곳이 있나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>복용하는 약은 잘 챙겨 먹었나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
        </Card></Grid>
        <Grid item xs={6}>
        <Card id='answerCategory_health' variant='outlined' sx={{padding:'20px', mt:'10px'}} >
            <Box sx={{
                width:'60px',
                height:'40px',
                border:'2px solid black',
                color:'black',
                fontWeight:'bold',
                fontSize:'20px',
                borderRadius:'10px',
                textAlign:'center',
                paddingTop:'4px',
                mb:'15px'
            }}>건강</Box>
            <Typography variant='h6' mt='5px'>편안하게 잠을 잘 잤나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>하루 30분 이상 규칙적인 운동을 하셨나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>지금 현재 아픈 곳이 있나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>복용하는 약은 잘 챙겨 먹었나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
        </Card></Grid>
        <Grid item xs={6}>
        <Card id='answerCategory_health' variant='outlined' sx={{padding:'20px', mt:'10px'}} >
            <Box sx={{
                width:'60px',
                height:'40px',
                border:'2px solid black',
                color:'black',
                fontWeight:'bold',
                fontSize:'20px',
                borderRadius:'10px',
                textAlign:'center',
                paddingTop:'4px',
                mb:'15px'
            }}>건강</Box>
            <Typography variant='h6' mt='5px'>편안하게 잠을 잘 잤나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>하루 30분 이상 규칙적인 운동을 하셨나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>지금 현재 아픈 곳이 있나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
            <Divider />
            <Typography variant='h6' mt='5px'>복용하는 약은 잘 챙겨 먹었나요?</Typography>
            <Typography variant='h6' textAlign='right' mb='5px'>네</Typography>
        </Card></Grid>
        </Grid>
        </>
    );
}