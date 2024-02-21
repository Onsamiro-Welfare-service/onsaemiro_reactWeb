import PropTypes from 'prop-types';


import {
    Stack,
    Button,
} from '@mui/material';

import Iconify from '../../../components/iconify';

SurveyHead.propTypes = {
  addClick: PropTypes.func,
  seqClick: PropTypes.func,
}

export default function SurveyHead({addClick, seqClick}){
    return(
        <>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={3} mr={4} spacing={3}>
            <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} onClick={seqClick}>
              순서변경
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} align="right" onClick={addClick} >
              질문추가
            </Button>
          </Stack> 
        </>
    );
}