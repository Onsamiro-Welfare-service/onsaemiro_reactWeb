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

  return (
    <Slide direction="up" in={status} mountOnEnter unmountOnExit >
      <Box>
        <PreviewSurvey data={data} /> 
      </Box>
    </Slide>
  );
}