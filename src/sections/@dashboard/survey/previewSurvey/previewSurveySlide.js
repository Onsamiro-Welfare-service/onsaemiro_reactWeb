import PropTypes from 'prop-types';

import {
    Slide, Box

} from '@mui/material';
import PreviewSurvey from './previewSurvey';

PreviewSurveySlide.propTypes = {
    status: PropTypes.bool,
    data: PropTypes.object,
}

export default function PreviewSurveySlide({status, data}) {
  const newData = {
    question: data.question,
    imageUrl: data.imageUrl ? URL.createObjectURL(data.imageUrl) : null,
    answerList: data.answers.map(answer => ({
      description: answer.answer,
      imageUrl: answer.imageUrl ? URL.createObjectURL(answer.imageUrl) : null,
    }))
  }

  return (
    <Slide direction="up" in={status} mountOnEnter unmountOnExit >
      <Box>
        <PreviewSurvey data={newData} /> 
      </Box>
    </Slide>
  );
}