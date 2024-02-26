import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  TablePagination,
  Modal,Box
} from '@mui/material';


// sections
import SurveyToolbar from '../sections/@dashboard/survey/surveyToolBar';
import { SurveyList,SurveyHead } from '../sections/@dashboard/survey/index';
import ModalAddSurvey from '../sections/@dashboard/survey/addSurvey';
import ModalSeqSurvey from '../sections/@dashboard/survey/seqSurvey/seqSurvey';
import PreviewSurveyModal from '../sections/@dashboard/survey/previewSurvey/previewSurveyModal';
import ModalModifySurvey from '../sections/@dashboard/survey/modifySurvey';
// mock
import USERLIST from '../_mock/user';


// 메인 함수 
export default function UserPage() {

  const [page, setPage] = useState(0);

  // const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };


  const [modalState, setModalState] = useState({ status: false, val: '' });
  const openModal = (val) => setModalState({ status: true, val });
  const closeModal = () => setModalState({ status: false, val: '' });

  const [surveyData, setSurveyData] = useState({});
  const setDatas = (data) => setSurveyData(data);
  // const resetDatas = () => setSurveyData({});

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
              {modalState.val === 'add' && <ModalAddSurvey status={modalState.status} />}
              {modalState.val === 'seq' && <ModalSeqSurvey status={modalState.status} />}
              {modalState.val === 'preview' && <PreviewSurveyModal status={modalState.status} data={surveyData} /> }
              {modalState.val === 'modify' && <ModalModifySurvey status={modalState.status} data={surveyData} /> }
            </Box>
          </Modal>

          <SurveyToolbar  filterName={filterName} onFilterName={handleFilterByName} /> {/* numSelected={selected.length} */}
          <SurveyHead addClick={()=>openModal('add')} seqClick={()=>openModal('seq')} />
          
          <SurveyList prevClick={()=>openModal('preview')} modifyClick={()=>openModal('modify')} setData={setDatas}/>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      
    </>
  );
}
