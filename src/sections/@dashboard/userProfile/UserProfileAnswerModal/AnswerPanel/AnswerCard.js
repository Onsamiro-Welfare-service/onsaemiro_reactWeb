import PropTypes from 'prop-types';
import React from 'react';
import { Typography, Card, Divider, Grid } from "@mui/material";


import CategoryIcon from '../../../../../components/category/categoryIcon';

AnswerCard.propTypes = {
    surveyData: PropTypes.array.isRequired,
    category: PropTypes.string,
};

export default function AnswerCard({surveyData, category}) {


    return (
        <Grid item xs={6} key={category}>
            <Card variant='outlined' sx={{padding:'20px', mt:'10px'}}>
                <CategoryIcon category={category} />
                { surveyData.length > 0 ?
                    surveyData.map((item, index) => (
                        <React.Fragment key={index}>
                            <Typography variant='h6' mt='5px'>{item.survey}</Typography>
                            <Typography variant='h6' textAlign='right' mb='5px'>{item.answer}</Typography>
                            {index < surveyData.length - 1 && <Divider />}
                        </React.Fragment>)
                    ):
                    <Typography variant='h6' mt='5px'>답변이 존재하지 않습니다.</Typography>
                }
            </Card>
        </Grid>
    );
}
