import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Checkbox, TableRow, TableCell, TableBody, Stack, Typography, Collapse, Box } from '@mui/material';
import Label from '../../../components/label';
import { API } from '../../../apiLink';
import { postRequestApi } from '../../../apiRequest';

RequirementListBody.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  filteredUsers: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default function RequirementListBody({ page, rowsPerPage, selected, filteredUsers, emptyRows, handleClick }) {
  const [expandedRows, setExpandedRows] = useState({});

  const handleRowClick = (id, event) => {
    // 체크박스 클릭 이벤트가 상위 행 클릭 이벤트로 전파되지 않도록 합니다.
    event.stopPropagation();

    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCheckboxClick = (name, event) => {
    // 체크박스 클릭 이벤트 처리
    handleClick(event, name);
    // 이벤트 전파를 막아 상위 행 클릭 이벤트가 발생하지 않도록 합니다.
    event.stopPropagation();
  };

  const navigate = useNavigate();
  const handleClickRequirement = async(clickedId) => {  
    const errMsg = 'Error : [RequirementListBody] handleClickRequirement';
    

    try {
      console.log()
      const response = await postRequestApi(`${API.checkRequirement}?requestId=${clickedId}` , null, errMsg, navigate);
      if (response.status === 200) {
        console.log('성공');
        } else {
          console.error(errMsg, '지정되지 않은 에러');
        }
  } catch (error) {
      console.error(errMsg, error);
  }};

  return (
    <TableBody>
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, description, status=false, uploadDate, imageUrl, imageLength } = row;
        const date = new Date(uploadDate);
        const koreanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000));
        const uploadTime = koreanTime.toISOString().replace('T', ' ').substring(0, 19);
        const isRowSelected = selected.includes(id);
        const isRowExpanded = !!expandedRows[id]; // Convert to boolean

        return (
          <React.Fragment key={id}>
            <TableRow hover onClick={(event) => {
              handleRowClick(id, event); 
              if (!status) handleClickRequirement(id)
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
                  {/* <Avatar alt={name} src={imageUrl} /> */}
                  <Typography variant="subtitle2" noWrap>
                    {`김아무개_${id}`}
                  </Typography>
                </Stack>
              </TableCell>
              
              <TableCell align="inherit">
                <Label color={status ? 'error': 'success'}>
                  {status ? "확인":"미확인"}
                </Label>
              </TableCell>

              <TableCell align="left">{description}</TableCell>              

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
                          <img key={`image-${index}`} src={`${imageUrl}/${index}`} alt={name} style={{display: 'block', margin: 'auto', width: '30%', border:'1px solid black', marginBottom: 10}} />
                        ))}
                      </Box>
                      <Box sx={{ backgroundColor:'#f1f1f1', borderRadius:'5px', padding: 1, margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">{description}</Typography>
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
