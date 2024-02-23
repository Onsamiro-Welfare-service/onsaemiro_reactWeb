import PropTypes from 'prop-types';

import {
    Box
} from '@mui/material';

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

ModalSeqSurvey.propTypes = {
    status: PropTypes.bool,
}

export default function ModalSeqSurvey({status}) {
  
  return (
    <Box sx={style} display={status ? 'block':'none'}>순서 변경 폼</Box>
  );
}