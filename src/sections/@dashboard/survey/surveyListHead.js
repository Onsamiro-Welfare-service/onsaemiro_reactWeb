import PropTypes from 'prop-types';


import {
    Stack,
    Button,
} from '@mui/material';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import CategoryIcon from '@mui/icons-material/Category';

import Iconify from '../../../components/iconify';



SurveyHead.propTypes = {
  addClick: PropTypes.func,
  seqClick: PropTypes.func,
  categoryClick: PropTypes.func,
}

export default function SurveyHead({addClick, seqClick, categoryClick }){
    return(
        <>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={3} mr={4} spacing={3}>
            <Button variant="outlined" startIcon={<CategoryIcon />} onClick={categoryClick}>
              카테고리
            </Button>
            <Button variant="outlined" startIcon={<SwapVertIcon />} onClick={seqClick}>
              순서변경
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} align="right" onClick={addClick} >
              질문추가
            </Button>
          </Stack> 
        </>
    );
}