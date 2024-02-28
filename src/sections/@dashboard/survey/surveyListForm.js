import PropTypes from 'prop-types';

import React, { useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Button,
  Grid,
  Chip,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import CategoryIcon from '../../../components/category/categoryIcon';


SurveyListForm.propTypes = {
    question: PropTypes.string,
};

export default function SurveyListForm({ question }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ width: '10%',textAlign:'center' }}>
            <Box sx={{width:'50px', ml:'10px', fontWeight:'bold', fontSize:'17px',border:'2px solid black', borderRadius: '5px'}}>건강</Box>
        </TableCell>
        <TableCell />
        <TableCell style={{ width: '55%' }}>{question}</TableCell>
        <TableCell align="left" style={{ width: '25%' }}>
            <Chip label="사지선다" />
            <Chip label="중증도" />
            {/* <Box sx={{ height:'25px',border:'1px solid rgb(255 109 0)',borderRadius:'4px',color:'rgb(255 109 0)', ml:'2px', px:'3px', fontWeight:'bold', display:'inline-block'}}>선택형</Box>
            <Box sx={{ height:'25px',border:'1px solid cornflowerblue',borderRadius:'4px',color:'cornflowerblue', ml:'2px', px:'3px', fontWeight:'bold', display:'inline-block'}}>중증도</Box> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{border:'1px solid black',  padding:'10px'}} >
                {/* <Typography variant='h4'>질문입니다.</Typography>
                <Typography variant='h6' ml={10}>1답변입니다.</Typography> */}
            {/* <CategoryIcon category='건강'/> */}
            <Grid container spacing={0.1} mb={2}>
                <Grid item xs={9.6}>
                <Typography variant="h6" gutterBottom component="div">
                자세히
              </Typography>
                </Grid>
                <Grid item xs={1.2}>
                <Button variant='outlined' sx={{ float:'right'}}>미리보기</Button>
                </Grid>
                <Grid item xs={1.2}>
                <Button variant='outlined' sx={{ float:'right'}}>수정하기</Button>
                </Grid>
            </Grid>
            
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>형식</TableCell>
                    <TableCell>내용</TableCell>
                    <TableCell align="right">사진 유무</TableCell>
                    <TableCell align="right">중증도</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        질문
                      </TableCell>
                      <TableCell>오늘 아침 어떠셨나요?</TableCell>
                      <TableCell align="right">O</TableCell>
                      <TableCell align="right">O</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        답변
                      </TableCell>
                      <TableCell>네 잘 먹었어요</TableCell>
                      <TableCell align="right">O</TableCell>
                      <TableCell align="right">O</TableCell>
                    </TableRow>

                </TableBody>
              </Table>
            </Box>
           
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

