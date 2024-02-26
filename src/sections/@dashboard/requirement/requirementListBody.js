import PropTypes from 'prop-types';

// @mui
import { Checkbox, TableRow, TableCell, TableBody, Stack, Avatar, Typography, IconButton } from '@mui/material';

import Label from '../../../components/label';
import Iconify from '../../../components/iconify';

RequirementListBody.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  filteredUsers: PropTypes.array,
  emptyRows: PropTypes.number,
  handleClick: PropTypes.func,
  handleOpenMenu: PropTypes.func,
  sentenceCase: PropTypes.func
};



export default function RequirementListBody({page, rowsPerPage, selected, filteredUsers, emptyRows, handleClick, handleOpenMenu, sentenceCase}){
    return (
      <TableBody>
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, description, status, userId,  imageUrl } = row;
        const selectedUser = selected.indexOf(name) !== -1;

        return (
          <TableRow hover key={id} tabIndex={-1} description="checkbox" selected={selectedUser}>
            <TableCell padding="checkbox">
              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
            </TableCell>

            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={name} src={ imageUrl } />
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">{userId}</TableCell>

            <TableCell align="left">{description}</TableCell>

            

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
    );
}