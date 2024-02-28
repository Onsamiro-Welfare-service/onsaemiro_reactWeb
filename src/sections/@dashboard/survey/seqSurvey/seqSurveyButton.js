import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

SeqSurveyButton.propTypes = {
    open: PropTypes.bool,
    click: PropTypes.func,
    confirm: PropTypes.func,
    close: PropTypes.func,
}

export default function SeqSurveyButton({open, click, confirm, close}) {
    return (
        <>
            <Button variant='contained' sx={{float:'right', mt:'15px'}} onClick={click}>변경하기</Button>

            <Dialog open={open} onClose={close}>
                <DialogTitle id="alert-dialog-title">{"변경 확인"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    변경하시겠습니까?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={close}>취소</Button>
                <Button onClick={confirm} autoFocus>
                    확인
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}