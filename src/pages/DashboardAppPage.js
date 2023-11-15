import { useEffect, useState } from 'react'; 
// import Avatar from '@mui/material/Avatar';
import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  UserProfiles,
  // AppCurrentSubject,
  // AppConversionRates,
  UserAddModal,
  UserAnswerModal
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  function generateRandomData() {
    return {
      address: '주소',
      birth: '1999-10-01',
      phone: '010-4151-2489',
      level: Math.floor(Math.random() * 3), // 0, 1, 2 중에서 무작위 레벨 선택
      name: '김승주', // 무작위 이름
      id: 'b1111' // 무작위 ID
    };
  }
  
  // 임의 프로필 데이터 배열 생성
  const data = Array.from({ length: 5 }, generateRandomData);

  

  // 유저 프로필 등록하는 모달팝업
  const [modalUserAdd, setModalUserAdd] = useState(false);
  const click = () => setModalUserAdd(true);
  const close = () => setModalUserAdd(false);
  const [modalUserAnswer, setModalUserAnswer] = useState(false);
  const [modalUserData, setModalUserData] = useState(['','']);
  const profClick = () => setModalUserAnswer(true);
  const profClose = () => setModalUserAnswer(false);
  const getProfileInfo = async(event) => {
    await setModalUserData(event.currentTarget.id.split('_'));
    
  };

  useEffect(() => {
    console.log(modalUserData);
    if(modalUserData[0] !== ''){
      profClick();
    }
    
  }, [modalUserData]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      
      {/* 유저 프로필 추가 모달 페이지 */}
      <UserAddModal click={ modalUserAdd } close={ close } />

      <UserAnswerModal click={ modalUserAnswer } close={ profClose }  data={modalUserData} />

      {/* 메인 페이지 */}
      <Container maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" spacing={3}>

          {/* 페이지 상단 제목 */}
          <Grid item>
            <Typography variant="h4" sx={{ mb: 5 }}>
              온새미로 프로필 페이지입니다.
            </Typography>
          </Grid>

          {/* 유저 프로필 추가 버튼 */}
          <Grid item>
            <Button variant="outlined" 
              sx={{ 
                width: '200px',
                height: '50px', 
                mb: '20px', 
                fontWeight: 'bold', 
                fontSize: '20px'
              }}
              onClick={ click }
              >
              추가하기
            </Button>
          </Grid>
        </Grid>
        
        {/* 유저 프로필 리스트 */}
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid key={index} item xs={12} sm={10} md={4}>
              <UserProfiles data={item} onClick={ getProfileInfo } />
            </Grid>
          ))}

        </Grid>
      </Container>
    </>
  );
}

