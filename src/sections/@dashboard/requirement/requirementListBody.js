import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TableRow, TableCell, TableBody, Stack, Avatar, Typography, Collapse, Box } from '@mui/material';
import Label from '../../../components/label';

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

  return (
    <TableBody>
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, description, status, orderDate, imageUrl } = row;
        const isRowSelected = selected.includes(name);
        const isRowExpanded = !!expandedRows[id]; // Convert to boolean

        return (
          <React.Fragment key={id}>
            <TableRow hover onClick={(event) => handleRowClick(id, event)}>
              <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={isRowSelected}
                  onChange={(event) => handleCheckboxClick(name, event)}
                  onClick={(event) => event.stopPropagation()} // 체크박스 자체 클릭 이벤트가 상위로 전파되지 않도록 합니다.
                />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={name} src={imageUrl} />
                  <Typography variant="subtitle2" noWrap>
                    {name}
                  </Typography>
                </Stack>
              </TableCell>
              
              <TableCell align="inherit">
                <Label color={(status === 'banned' && 'error') || 'success'}>
                  {status}
                </Label>
              </TableCell>

              <TableCell align="left">{description}</TableCell>              

              <TableCell align="left">{orderDate}</TableCell>
            </TableRow>

            {isRowExpanded && !isRowSelected && (
              <TableRow key={`detail-${id}`}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                    <Box margin={1} sx={{height: '100px', margin:5}}>
                      {/* <Typography variant="h5" gutterBottom component="div">자세히</Typography> */}
                      
                      <img src={imageUrl} alt={name} style={{display: 'block', margin: 'auto', width: '50%', border:'1px solid black', marginBottom: 10}} />

                      <Typography variant="h6" gutterBottom component="div">{description}</Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
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
