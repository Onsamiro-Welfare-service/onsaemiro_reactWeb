import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  Modal,Box,
  
} from '@mui/material'; // TablePagination,


// sections
import SurveyToolbar from '../sections/@dashboard/survey/surveyToolBar';
import { SurveyList,SurveyHead } from '../sections/@dashboard/survey/index';
import ModalAddSurvey from '../sections/@dashboard/survey/addSurvey';
import ModalSeqSurvey from '../sections/@dashboard/survey/seqSurvey/seqSurvey';
import PreviewSurveyModal from '../sections/@dashboard/survey/previewSurvey/previewSurveyModal';
import ModalModifySurvey from '../sections/@dashboard/survey/modifySurvey';

// api request
import { API } from '../apiLink';
import { getDefaultRequestApi } from '../apiRequest';
import { getCookie } from '../sections/auth/cookie/cookie';

// 메인 함수 
export default function UserPage() {
  // 질문 리스트 헤더 및 하단 툴바 비활성화 (페이지네이션 기능 추가 예정)
  // const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  const handleFilterByName = () => {  
  ;setFilterName('');
  };
  // const handleFilterByName = (event) => {
  //  setPage(0);
  //  setFilterName(event.target.value);
  //  };

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([{id: ''}]);
  const [surveyList, setSurveyList] = useState([]);


  const fetchSurveyData = useCallback(async () => {
    const errMsg = 'Error : [SurveyListpage] fetchSurveyData';

    try {
      const categoryResponse = await getDefaultRequestApi(API.getCategoryList, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
      setCategoryList(categoryResponse.data.categoryList);

      setSurveyList([]);
      categoryResponse.data.categoryList.forEach(async (category) => {
        const surveyResponse = await getDefaultRequestApi(`${API.getCategorySurveyList}/${category.id}`, errMsg, navigate, getCookie('accessToken'), getCookie('refreshToken'));
        // console.log("surveyResponse ",surveyResponse.data);
        setSurveyList(surveyList => [...surveyList, ...surveyResponse.data.surveyList]);
      });
    } catch (error) {
      console.error(errMsg, error);
    }
  }, [navigate]);
  useEffect(() => {
    

    fetchSurveyData();
  }, [fetchSurveyData]);

  


  const [modalState, setModalState] = useState({ status: false, val: '' });
  const openModal = (val) => setModalState({ status: true, val });
  const closeModal = () => setModalState({ status: false, val: '' });

  const [surveyData, setSurveyData] = useState({});
  const setDatas = (data) => setSurveyData(data);
  // const resetDatas = () => setSurveyData({});

  // 삭제 팝업
  
  

  useEffect(() => {
  }, [modalState]);

  return (
    <>
      <Helmet>
        <title> 요구사항 | 온새미로 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom mt={3} >
            질문리스트 조회 및 생성
          </Typography>
        </Stack>

        <Card>
          <Modal open={modalState.status} onClose={closeModal} aria-labelledby="surveyModal">
            <Box>
              {modalState.val === 'add' && <ModalAddSurvey status={modalState.status} close={closeModal} reload={fetchSurveyData}/>}
              {modalState.val === 'seq' && <ModalSeqSurvey status={modalState.status} surveys={surveyList} categoryList={categoryList} />}
              {modalState.val === 'preview' && <PreviewSurveyModal status={modalState.status} data={surveyData} /> }
              {modalState.val === 'modify' && <ModalModifySurvey status={modalState.status} data={surveyData} close={closeModal} reload={fetchSurveyData}/> }
            </Box>
          </Modal>

          <SurveyToolbar  filterName={filterName} onFilterName={handleFilterByName} /> {/* numSelected={selected.length} */}
          <SurveyHead addClick={()=>openModal('add')} seqClick={()=>openModal('seq')} />
          
          <SurveyList prevClick={()=>openModal('preview')} modifyClick={()=>openModal('modify')} setData={setDatas} categoryList={categoryList} surveyList={surveyList} />

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={surveyData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>

      
    </>
  );
}
