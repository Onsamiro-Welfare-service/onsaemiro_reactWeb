import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components

import Scrollbar from '../components/scrollbar';
// sections
import { RequirementListHead, RequirementListToolbar } from '../sections/@dashboard/requirement';
import RequirementListBody from '../sections/@dashboard/requirement/requirementListBody';
import RequirementListNotFound from '../sections/@dashboard/requirement/requirementListNotFound';
// import RequirementListPopover from '../sections/@dashboard/requirement/requirementListPopover';

const testData = [
  { imageUrl: '', name: 'ㄴㄴㄴ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '1' },
  { imageUrl: '', name: 'ㄱㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는중', id: '2' },
  { imageUrl: '', name: 'ㄴㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '3' },
  { imageUrl: '', name: 'ㄷㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '4' },
  { imageUrl: '', name: 'ㄹㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '5' },
  { imageUrl: '', name: 'ㅁㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '6' },
  { imageUrl: '', name: 'ㅂㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '7' },
  { imageUrl: '', name: 'ㅅㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '8' },
  { imageUrl: '', name: 'ㄴㄴㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '9' },
  { imageUrl: '', name: 'ㄱㄱㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '10' },
  { imageUrl: '', name: 'ㄹㄹㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '11' },
  { imageUrl: '', name: 'ㅎㅎㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '12' },
  { imageUrl: '', name: 'ㅂㅂㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '13' },
  { imageUrl: '', name: 'ㅍㅍㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '14' },
  { imageUrl: '', name: 'ㅋㅋㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '15' },
  { imageUrl: '', name: 'ㅁㅁㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '16' },
  { imageUrl: '', name: 'ㄱㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '17' },
  { imageUrl: '', name: 'ㄴㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '18' },
  { imageUrl: '', name: 'ㄷㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '19' },
  { imageUrl: '', name: 'ㄹㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '20' },
  { imageUrl: '', name: 'ㅁㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '21' },
  { imageUrl: '', name: 'ㅂㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '22' },
  { imageUrl: '', name: 'ㅅㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '23' },
  { imageUrl: '', name: 'ㅋㅇㅇㅇ', orderDate: '2024-12-01 12:22:22', status: 'active', description: '이런저런내용이 있는데 어디까지 길게해야 적당히 될까 보는중', id: '24' }
];

const TABLE_HEAD = [
  { id: 'name', label: '이름', alignRight: false },
  { id: 'status', label: '상태', alignRight: false },
  { id: 'description', label: '내용', alignRight: false },
  { id: 'orderDate', label: '시간', alignRight: false },
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
export default function DashboardUserRequirement() {
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  
  // 메뉴 열기
  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };
  // 메뉴 닫기
  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  // 정렬 관련 함수
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // 전체 선택 관련 함수
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = testData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // 삭제 관련 함수
  const handleDelete = () => {
    console.log(selected);
  };
  // 테이블 행 선택 관련 함수
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

  // 페이징 관련 함수
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 행 수 관련 함수
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // 필터링 관련 함수
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // 테이블 행 수 계산
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - testData.length) : 0;
  // 필터링 관련 변수
  const filteredUsers = applySortFilter(testData, getComparator(order, orderBy), filterName);
  // 검색했을때 아무값이 나오지 않는 경우
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User Requirement | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            사용자 요구사항
          </Typography>

        </Stack>

        <Card>
          <RequirementListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} delClick={handleDelete} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>

                <RequirementListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={testData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}/>
                  
                 {/* 요구사항 리스트 부분 */}
                <RequirementListBody 
                  page={page} 
                  rowsPerPage={rowsPerPage} 
                  selected={selected} 
                  filteredUsers={filteredUsers} 
                  emptyRows={emptyRows} 
                  handleClick={handleClick} />

                {/* 검색했을때 아무값이 나오지 않는 경우 */}
                <RequirementListNotFound isNotFound={isNotFound} filterName={filterName} />
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={testData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      
      {/* <RequirementListPopover open={open} handleCloseMenu={handleCloseMenu} click={handleDelete} /> */}
    </>
  );
}
