import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { API } from '../apiLink';
import { getRequestApi, postRequestApi } from '../apiRequest';
import { getCookie } from '../sections/auth/cookie/cookie';


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
  const navigate = useNavigate();
  const [userRequirement, setUserRequirement] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserRequirements = async () => {
      const errMsg = 'Error : getUserRequirements';
      const params = { managerId: getCookie('managerId') };
  
      try {
        const response = await getRequestApi(API.getRequirementList, params, errMsg, navigate);
        if (response.status === 200 && response.data.requestList !== undefined) {
          setUserRequirement(response.data.requestList.reverse());
        } else {
          console.error(errMsg, '지정되지 않은 에러');
        }
      } catch (error) {
        console.error(errMsg, error);
      }
    };
    const getUserList = async () => {
      const errMsg = 'Error : getUserList';
      const params = { departmentId: 2 };
  
      try {
        const response = await getRequestApi(API.userProfileList, params, errMsg, navigate);
        if (response.status === 200 && response.data.userList !== undefined) {
          setUserList(response.data.userList);
        } else {
          console.error(errMsg, '지정되지 않은 에러');
        }
      } catch (error) {
        console.error(errMsg, error);
      }
    };
    getUserList();
    getUserRequirements();
  }, [navigate]);
  // const [open, setOpen] = useState(null);
  // 메뉴 열기
  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };
  // 메뉴 닫기
  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]); // 선택된 행 - 화면에 표시되는 데이터는 이거

  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  
  

  // 정렬 관련 함수
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // 전체 선택 관련 함수
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userRequirement.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // 삭제 관련 함수
  const handleDelete = async() => {
    const errMsg = 'Error : [deleteRequirement]';
  
    try {
      selected.forEach(async (id) => {
        const response = await postRequestApi(`${API.deleteRequirement}?requestId=${id}`, null, errMsg, navigate, 'DELETE');
        if (response.status === 200) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(errMsg, error);
    }
    // console.log(selected);

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

  
  const handleChangePage = (event, newPage) => { // 페이징 관련 함수
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => { // 행 수 관련 함수
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => { // 필터링 관련 함수
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userRequirement.length) : 0;// 테이블 행 수 계산
  const filteredUsers = applySortFilter(userRequirement, getComparator(order, orderBy), filterName);// 필터링 관련 변수
  const isNotFound = !filteredUsers.length && !!filterName;// 검색했을때 아무값이 나오지 않는 경우

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
                  rowCount={userRequirement.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}/>
                  
                 {/* 요구사항 리스트 부분 */}
                <RequirementListBody 
                  page={page} 
                  rowsPerPage={rowsPerPage} 
                  userData={userList}
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
            count={userRequirement.length}
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
