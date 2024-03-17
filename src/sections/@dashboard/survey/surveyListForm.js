import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState  } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { API } from '../../../apiLink';
import { postRequestApi } from '../../../apiRequest';
import { getCookie } from '../../auth/cookie/cookie';

// import { tagList, levelList } from './constants';
// import CategoryIcon from '../../../components/category/categoryIcon';


SurveyListForm.propTypes = {
  surveyData: PropTypes.object,
  prevClick: PropTypes.func,
  modifyClick: PropTypes.func,
  setData: PropTypes.func,
  categoryList: PropTypes.array,
};

export default function SurveyListForm({ surveyData, prevClick, modifyClick, setData, categoryList }) {
  // console.log('SurveyListForm-surveyData:', surveyData);
  // console.log('SurveyListForm-categoryList: ', categoryList);
  const [open, setOpen] = useState(false);
  
  const categoryObject = categoryList.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});
  const categoryListMapping = categoryObject;

  // 삭제 다이얼로그
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteSurveyData, setDeleteSurveyData] = useState({});
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const navigate = useNavigate();
  const handleDeleteSurvey = async() => { // 삭제 다이얼로그 닫기 delete request
    const errMsg = 'Error : [SurveyListForm] handleDeleteSurvey';
    const config = {
      surveyId: deleteSurveyData.id,
    }
    console.log(config);

    try {
      const response = await postRequestApi(API.deleteSurvey , JSON.stringify(config), errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'), 'DELETE');
      if (response.status === 200) {
        console.log('성공');
        setOpenDialog(false); // 다이얼로그 닫기
        window.location.reload(); // 페이지 새로고침
        } else {
          console.error(errMsg, '지정되지 않은 에러');
        }
    } catch (error) {
        console.error(errMsg, error);
    }
  };
    
  
  return (
    <>
      {/* 이 부분은 질문의 기본 정보를 나타냅니다. */}
      <TableRow onClick={() => setOpen(!open)} sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        {/* 이 부분은 자세히보기 버튼의 화살표 아이콘을 넣는 부분입니다. */}
         <TableCell> 
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> 

        {/* 이 부분은 카테고리 태그를 나타내는 부분입니다. */}
        <TableCell style={{ width: '13%',textAlign:'center' }}>
            <Box sx={{  ml:'10px', fontWeight:'bold', fontSize:'17px',border:'2px solid black', borderRadius: '5px', padding: '3px 5px'}}>{categoryListMapping[surveyData.categoryId]}</Box>
        </TableCell>
        <TableCell />
        
        {/* 이 부분은 질문 사항을 표시하는 부분입니다. */}
        <TableCell style={{ width: '55%', fontWeight:'bold', fontSize:'18px' }}>{surveyData.question}</TableCell>

        {/* 이 부분은 태그를 나타내는 부분입니다. */}
        <TableCell align="left" style={{ width: '25%' }}>
            <Chip label={`타입 ${surveyData.type}`} />
            <Chip label={`레벨-${surveyData.level}`} />
        </TableCell>
      </TableRow>

      {/* 이 부분은 해당 질문의 자세한 정보를 나타냅니다. */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding:'10px', margin:'10px'}} >
                
              <Grid container spacing={0.1} mb={2}>
                  <Grid item xs={9}>
                  <Typography variant="h6" gutterBottom component="div">
                  상세 정보
                </Typography>
                  </Grid>
                  <Grid item xs={1}>
                  {/* // todo: 미리보기 버튼을 누르면 surveyData를 넘겨주며 ModalPreviewSurveySlide를 띄워줍니다. */}
                  <Button variant='outlined' sx={{ float:'right'}} onClick={()=>{prevClick(); setData(surveyData)}}>미리보기</Button>
                  </Grid>
                  <Grid item xs={1}>
                  <Button variant='outlined' sx={{ float:'right'}} onClick={()=>{modifyClick(); setData(surveyData)}}>수정하기</Button>
                  </Grid>
                  <Grid item xs={1}>
                  <Button variant='contained' sx={{ float:'right'}} onClick={()=>{handleOpenDialog(); setDeleteSurveyData(surveyData)}}>삭제하기</Button>
                  </Grid>
              </Grid>
            
              <Table size="small" aria-label="purchases" variant={'head'} sx={{border:'2px solid #00000014'}}>
                {/* 이 부분은 질문과 답변의 형식을 나타냅니다. */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{px:1, marginLeft:1}}>형식</TableCell>
                    <TableCell sx={{px:1}}>사진 유무</TableCell>
                    <TableCell>내용</TableCell>
                  </TableRow>
                </TableHead>

                {/* 이 부분은 질문과 답변의 내용을 나타냅니다. */}
                <TableBody>

                  {/* 이 부분은 질문의 내용을 나타냅니다. */}
                  <TableRow>
                    <TableCell>질문</TableCell>
                    <TableCell>{surveyData.imageUrl!==null ? 'O': 'X'}</TableCell>
                    <TableCell>{surveyData.question}</TableCell>
                  </TableRow>

                  {/* 이 부분은 답변의 내용을 나타냅니다. */}
                  { surveyData.answerList.map((answer, index) => (
                      <TableRow key={index}>
                        <TableCell>답변</TableCell>
                        <TableCell>{answer.imageUrl!==null ? 'O' : 'X'}</TableCell>
                        <TableCell>{answer.description}</TableCell>
                      </TableRow>
                  ))}
                    

                </TableBody>
              </Table>
            </Box>
           
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog
        open={openDialog}
        onClose={handleDeleteSurvey}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`[카테고리:${deleteSurveyData.categoryId}] ${deleteSurveyData.question}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {"이 질문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={() => {
            console.log('삭제 로직 실행');
            handleDeleteSurvey();
          }} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

