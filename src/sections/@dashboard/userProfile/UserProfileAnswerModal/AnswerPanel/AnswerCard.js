import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Typography, Card, Divider, Grid } from "@mui/material";

import CategoryIcon from '../../../../../components/category/categoryIcon';

AnswerCard.propTypes = {
    surveyData: PropTypes.array.isRequired,
};

export default function AnswerCard({surveyData}) {
    const [surveys, setSurveys] = useState({});

    // surveyData가 변경될 때마다 카테고리별로 분류
    useEffect(() => {
        const classificationSurvey = surveyData.reduce((acc, cur) => {
            if (!acc[cur.category]) {
                acc[cur.category] = [];
            }
            acc[cur.category].push(cur);
            return acc;
        }, {});

        setSurveys(classificationSurvey);
    }, [surveyData]);

    return Object.keys(surveys).map((category) => (
        <Grid item xs={6} key={category}>
            <Card variant='outlined' sx={{padding:'20px', mt:'10px'}}>
                <CategoryIcon category={category} />
                {surveys[category].map((item, index) => (
                    <React.Fragment key={index}>
                        <Typography variant='h6' mt='5px'>{item.question}</Typography>
                        <Typography variant='h6' textAlign='right' mb='5px'>{item.answer}</Typography>
                        {index < surveys[category].length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Card>
        </Grid>
    ));
}
