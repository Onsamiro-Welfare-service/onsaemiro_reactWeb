import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  TablePagination,

} from '@mui/material';


// sections
import SurveyToolbar from '../sections/@dashboard/survey/surveyToolBar';
import { SurveyList,SurveyHead } from '../sections/@dashboard/survey/index';
import ModalAddSurvey from '../sections/@dashboard/survey/addSurvey/addSurvey';
import ModalSeqSurvey from '../sections/@dashboard/survey/seqSurvey/seqSurvey';
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

  const [modalAddSurvey, setModalAddSurvey] = useState(false);
  const addClick = () => setModalAddSurvey(true);
  const addClose = () => setModalAddSurvey(false)

  const [modalSeqSurvey, setModalSeqSurvey] = useState(false);
  const seqClick = () => setModalSeqSurvey(true);
  const seqClose = () => setModalSeqSurvey(false);

  useEffect(() => {
    if (modalSeqSurvey) {
      seqClick();
    }
    if (modalAddSurvey) {
      addClick();
    }
  }, [modalSeqSurvey,modalAddSurvey]);

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
          <ModalSeqSurvey status={modalSeqSurvey} close={seqClose} />
          <ModalAddSurvey status={modalAddSurvey} close={addClose} />
          

          <SurveyToolbar  filterName={filterName} onFilterName={handleFilterByName} /> {/* numSelected={selected.length} */}
          <SurveyHead addClick={addClick} seqClick={seqClick} />
          
          <SurveyList />

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
