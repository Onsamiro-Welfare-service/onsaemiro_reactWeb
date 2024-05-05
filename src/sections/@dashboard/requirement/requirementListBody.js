import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';


import { Checkbox, TableRow, TableCell, TableBody, Stack, Typography, Collapse, Box, Avatar } from '@mui/material';
import Label from '../../../components/label';
import { API } from '../../../apiLink';
import { postRequestApi } from '../../../apiRequest';
//  import { getCookie } from '../../auth/cookie/cookie';

  RequirementListBody.propTypes = {
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    userData: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    filteredUsers: PropTypes.array.isRequired,
    emptyRows: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  export default function RequirementListBody({ page, rowsPerPage, userData, selected, filteredUsers, emptyRows, handleClick }) {
    const [expandedRows, setExpandedRows] = useState({});
    const [requireList, setRequireList] = useState(filteredUsers); // 요구사항 리스트

    const handleRowClick = (id, event) => {
      event.stopPropagation();// 체크박스 클릭 이벤트가 상위 행 클릭 이벤트로 전파되지 않도록 합니다.
      setExpandedRows(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    };

    const handleCheckboxClick = (name, event) => {
      handleClick(event, name);// 체크박스 클릭 이벤트 처리
      event.stopPropagation();// 이벤트 전파를 막아 상위 행 클릭 이벤트가 발생하지 않도록 합니다.
    };

    const navigate = useNavigate();
    const handleClickRequirement = async(clickedId) => {  
      const errMsg = 'Error : [RequirementListBody] handleClickRequirement';
      setRequireList(requireList.map(item => 
        item.id === clickedId ? {...item, isChecked: true} : item));


      try {
        const cookies = new Cookies();
        const accessTkn = await cookies.get('accessToken');
        const refreshTkn = await cookies.get('refreshToken'); // accessTkn, refreshTkn
        if (!accessTkn || !refreshTkn) {
          console.error(errMsg, '접근 토큰 또는 갱신 토큰이 유효하지 않습니다. 다시 로그인이 필요합니다.');
          alert('로그아웃 되었습니다.');
          navigate('/login', { replace: true });
          return;
      }
        const response = await postRequestApi(`${API.checkRequirement}?requestId=${clickedId}` , null, errMsg, navigate, accessTkn, refreshTkn);
        if (response.status === 200) {
          console.log('체크 요청 성공');
          } else {
            console.error(errMsg, '지정되지 않은 에러');
          }
    } catch (error) {
        console.error(errMsg, error);
    }};

    useEffect(() => {
      setRequireList(filteredUsers);
    }, [filteredUsers]);
    return (
      <TableBody>
        { requireList && 
        requireList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          const { id, name, description, isChecked, uploadDate, imageUrl, imageLength, userId } = row; // 요구사항 정보
          const date = new Date(uploadDate); // 시간 형태로 변환
          const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // 한국 시간으로 변환
          const uploadTime = koreanTime.toISOString().replace('T', ' ').substring(0, 19); // 업로드 시간
          const isRowSelected = selected.includes(id); // 선택된 행인지 확인
          const isRowExpanded = !!expandedRows[id]; // 행이 확장되었는지 확인
          const user = userData.find((user) => user.id === userId) ?? {};
          

          return (
            <React.Fragment key={id}>
              <TableRow hover onClick={(event) => {
                handleRowClick(id, event); 
                if (!isChecked) {console.log(id); handleClickRequirement(id)}
              }}>
                <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                  <Checkbox
                    checked={isRowSelected}
                    onChange={(event) => handleCheckboxClick(id, event)}
                    onClick={(event) => event.stopPropagation()} // 체크박스 자체 클릭 이벤트가 상위로 전파되지 않도록 합니다.
                  />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={name} src={user?.imageUrl ? `${user.imageUrl}0` : undefined} />
                    <Typography variant="subtitle2" noWrap>
                      {user.userName}
                    </Typography>
                  </Stack>
                </TableCell>
                
                <TableCell align="inherit">
                  <Label color={isChecked ? 'error': 'success'}>
                    {isChecked ? "확인":"미확인"}
                  </Label>
                </TableCell>

                <TableCell align="left">{description !== "" ? description:"텍스트가 없는 항목입니다."}</TableCell>              
                <TableCell align="left">{uploadTime}</TableCell>
              </TableRow>

              {
                <TableRow key={`detail-${id}`}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ margin:5, overflow:'auto','&::-webkit-scrollbar':{display:'none'} }}> {/* 스크롤바 없애는거 - '&::-webkit-scrollbar':{display:'none'} */}
                        {/* <Typography variant="h5" gutterBottom component="div">자세히</Typography> */}
                        
                        <Box sx={{ height:'90%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                          {Array.from({length: imageLength }).map((_, index) => (
                            <img key={`image-${index}`} src={`${imageUrl}/${index}`} alt={name} style={{display: 'block', margin: 'auto', width: '30%', marginBottom: 10}} />
                          ))}
                        </Box>
                        <Box sx={{ backgroundColor:'#f1f1f1', borderRadius:'5px', padding: 1, margin: 1, color: description !== "" ? 'black':'gray'}}>
                          <Typography variant="h6" gutterBottom component="div">{description !== "" ? description:"텍스트가 없는 항목입니다."}</Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              }
            </React.Fragment>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }
