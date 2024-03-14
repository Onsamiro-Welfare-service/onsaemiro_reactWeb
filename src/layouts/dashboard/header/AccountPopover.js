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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  let logoutChk = false;
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // 로그아웃 처리하는 API
  const requestLogout = async() => {
    const manageId = getCookie("managerId");
    const accessTkn = getCookie("accessToken");

    await axios.post(API.manageLogout, 
      { "managerId": manageId },
      { headers: {
          'Authorization': `Bearer ${accessTkn}` 
      }
    }).then(() => {
      logoutChk = true;
    }).catch((error) => {
      console.log('[Error] Logout Api request:',error);
      if(error.name === 'AxiosError'){
        console.log('토큰으로 인한 AxiosError 발생. 로그아웃 처리함');
        logoutChk = true;
      } else {
        logoutChk = false;
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  // 버튼이 눌리면 로그아웃 처리
  const handleLogout = async() => {
    await requestLogout();
    if(logoutChk){
      setOpen(null);
      rmCookie();
      alert("로그아웃 되었습니다.");
      navigate('/login', { replace: true });
    } else {
      alert("로그아웃 실패. 다시 요청해주세요");
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
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
        open={open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
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
