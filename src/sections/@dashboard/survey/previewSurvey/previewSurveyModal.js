import PropTypes from 'prop-types';

import {
    Box

} from '@mui/material';
import PreviewSurvey from './previewSurvey';

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

PreviewSurveyModal.propTypes = {
    status: PropTypes.bool,
    data: PropTypes.object,
}

export default function PreviewSurveyModal({status, data}) {
    // console.log('PreviewSurveyModal:', data);
    return (
        <Box sx={style} display={status ? 'block':'none'}>
            <Box sx={{width: '532px',height: '673px', overflow:'hidden'}}>
                <PreviewSurvey data={data} />
            </Box>
        </Box>
  );
}