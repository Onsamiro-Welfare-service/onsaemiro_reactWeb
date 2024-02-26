import PropTypes from 'prop-types';

import { Popover, MenuItem } from '@mui/material';

import Iconify from '../../../components/iconify';

RequirementSearchPopover.propTypes = {
    open: PropTypes.bool,
    handleCloseMenu: PropTypes.func
};

export default function RequirementSearchPopover({open, handleCloseMenu}){
    return(
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

        <MenuItem sx={{ color: 'error.main' }} >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          삭제하기
        </MenuItem>
      </Popover>
    );
}