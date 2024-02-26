import PropTypes from 'prop-types';

import { TableBody, TableCell, TableRow, Paper, Typography } from '@mui/material';

RequirementListNotFound.propTypes = {
    isNotFound: PropTypes.bool,
    filterName: PropTypes.string
};

export default function RequirementListNotFound({isNotFound, filterName}) {
    return (
        <>
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
                      검색 결과 없음
                    </Typography>

                    <Typography variant="body2">
                      검색한 &nbsp; 
                      <strong>&quot;{filterName}&quot;</strong>에 대한 결과가 없습니다..
                      <br /> 검색어의 철자가 정확한지 확인하십시오.
                    </Typography>
                  </Paper>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </>
    );
}