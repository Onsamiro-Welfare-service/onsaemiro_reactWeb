import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from './header';
import Nav from './nav';
import { getCookie } from '../../sections/auth/cookie/cookie';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accessTkn = getCookie("accessToken");
    // const refreshTkn = getCookie("refreshToken");
    if(accessTkn === null && accessTkn === undefined){
      console.log("DashboardLayout.js : 로그인 권한이 없습니다");
      
      // alert('로그인 권한이 없습니다!');
      navigate('/login', { replace: true });
    }    

  }, [navigate]);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
