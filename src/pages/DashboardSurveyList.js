import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
<<<<<<< HEAD

=======
<<<<<<< HEAD
  Modal,Box
=======
  Select, FormControl, TableHead
>>>>>>> parent of d90a5ed (질문 생성)
>>>>>>> feature/authApi
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
<<<<<<< HEAD
import SurveyToolbar from '../sections/@dashboard/survey/surveyToolBar';
import { SurveyList,SurveyHead } from '../sections/@dashboard/survey/index';
import ModalAddSurvey from '../sections/@dashboard/survey/addSurvey/addSurvey';
import ModalSeqSurvey from '../sections/@dashboard/survey/seqSurvey/seqSurvey';
<<<<<<< HEAD
=======
import PreviewSurveyModal from '../sections/@dashboard/survey/previewSurvey/previewSurveyModal';
import ModalModifySurvey from '../sections/@dashboard/survey/modifySurvey';
=======
import { RequirementListHead, RequirementListToolbar } from '../sections/@dashboard/requirement';
>>>>>>> parent of d90a5ed (질문 생성)
>>>>>>> feature/authApi
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'loginId', label: 'Id', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'approve', label: 'Approve', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

// 리스트 정렬 관련
function descendingComparator(a, b, orderBy) { 
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) { 
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// 메인 함수 
export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

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

<<<<<<< HEAD
  const [modalAddSurvey, setModalAddSurvey] = useState(false);
  const addClick = () => setModalAddSurvey(true);
  const addClose = () => setModalAddSurvey(false)
=======
<<<<<<< HEAD
>>>>>>> feature/authApi

  const [modalSeqSurvey, setModalSeqSurvey] = useState(false);
  const seqClick = () => setModalSeqSurvey(true);
  const seqClose = () => setModalSeqSurvey(false);

  useEffect(() => {
<<<<<<< HEAD
    if (modalSeqSurvey) {
      seqClick();
    }
    if (modalAddSurvey) {
      addClick();
    }
  }, [modalSeqSurvey,modalAddSurvey]);
=======
  }, [modalState]);
=======
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
>>>>>>> parent of d90a5ed (질문 생성)
>>>>>>> feature/authApi

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
<<<<<<< HEAD
          <ModalSeqSurvey status={modalSeqSurvey} close={seqClose} />
          <ModalAddSurvey status={modalAddSurvey} close={addClose} />
          
=======
<<<<<<< HEAD
          <Modal open={modalState.status} onClose={closeModal} aria-labelledby="surveyModal">
            <Box>
              {modalState.val === 'add' && <ModalAddSurvey status={modalState.status} />}
              {modalState.val === 'seq' && <ModalSeqSurvey status={modalState.status} />}
              {modalState.val === 'preview' && <PreviewSurveyModal status={modalState.status} data={surveyData} /> }
              {modalState.val === 'modify' && <ModalModifySurvey status={modalState.status} data={surveyData} /> }
            </Box>
          </Modal>
>>>>>>> feature/authApi

          <SurveyToolbar  filterName={filterName} onFilterName={handleFilterByName} /> {/* numSelected={selected.length} */}
          <SurveyHead addClick={addClick} seqClick={seqClick} />
          
<<<<<<< HEAD
          <SurveyList />
=======
          <SurveyList prevClick={()=>openModal('preview')} modifyClick={()=>openModal('modify')} setData={setDatas}/>
=======
          <RequirementListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={3} mr={4} spacing={3}>
            <Button variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />} >
              순서변경
            </Button>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} align="right" >
              질문추가
            </Button>
          </Stack> 
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align='center'>질문</TableCell>
                    <TableCell align="right">답변 형식</TableCell>
                    
                  </TableRow>
                </TableHead>
              </Table>
              <TableBody>
                d
              </TableBody>

              {/* <Table>
                <RequirementListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">
                        <FormControl>
                          <Select
                            labelId="select-label"
                            id="select"
                            sx={{
                              width: '120px',
                              height: '40px',
                              fontWeight: '10px'
                            }}
                          >
                            <MenuItem value="banned">banned</MenuItem>
                            <MenuItem value="active">active</MenuItem>
                            <MenuItem value="suspend">suspend</MenuItem>
                            
                          </Select>
                        </FormControl>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table> */}
            </TableContainer>
          </Scrollbar>
>>>>>>> parent of d90a5ed (질문 생성)
>>>>>>> feature/authApi

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

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          삭제하기
        </MenuItem>
      </Popover>
    </>
  );
}
