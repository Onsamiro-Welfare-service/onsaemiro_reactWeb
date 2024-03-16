import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import { rmCookie, getCookie } from '../../../sections/auth/cookie/cookie';
import { API } from '../../../apiLink';
// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//   },
// ];

// ----------------------------------------------------------------------
export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isOpen = Boolean(anchorEl);

  // 로그아웃 처리하는 API
  const logoutUser = async (navigate) => {
    const manageId = getCookie("managerId");
    const accessTkn = getCookie("accessToken");
  
    try {
      await axios.post(API.manageLogout, { "managerId": manageId }, {
        headers: { 'Authorization': `Bearer ${accessTkn}` }
      });
      // Logout successful
      rmCookie();
      alert("로그아웃 되었습니다.");
      navigate('/login', { replace: true });
    } catch (error) {
      console.log('[Error] Logout Api request:', error);
      // Logout failed
      alert("로그아웃 실패. 다시 요청해주세요");
    }
  };

  const handleLogout = async () => {
    await logoutUser(navigate);
  };


  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(isOpen && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" />
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            관리자 계정
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
           온새미로 프로필
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label}>  
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          로그아웃
        </MenuItem>
      </Popover>
    </>
  );
}
