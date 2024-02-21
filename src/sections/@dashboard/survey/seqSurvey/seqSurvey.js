import PropTypes from 'prop-types';

import {
    Modal,
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
    close: PropTypes.func
}

export default function ModalSeqSurvey({status, close}) {
  
  return (
    <Modal
        open={status}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    ><Box sx={style}>순서 변경 폼</Box></Modal>
  );
}