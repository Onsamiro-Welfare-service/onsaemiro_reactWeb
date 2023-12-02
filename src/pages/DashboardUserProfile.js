import { useEffect, useState } from 'react'; 
import { Helmet } from 'react-helmet-async';

// @mui components
import { Grid, Container, Typography, Button, Stack } from '@mui/material';

// components
import Iconify from '../components/iconify';
// sections
import {
  UserProfiles,
  UserAddModal,
  UserAnswerModal
} from '../sections/@dashboard/userProfile';



// ----------------------------------------------------------------------

export default function DashboardUserProfile() {
  // const theme = useTheme();
  function generateRandomData() {
    return {
      address: '주소',
      birth: '1999-10-01',
      phone: '010-4151-2489',
      level: 0, // 0, 1, 2 중에서 무작위 레벨 선택
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
  const [modalUserData, setModalUserData] = useState(null);
  const profClick = () => setModalUserAnswer(true);
  const profClose = () => setModalUserAnswer(false);

  const getProfileInfo = async (item) => {
    await setModalUserData({...item});
  };

  useEffect(() => {
    if (modalUserData && Object.keys(modalUserData).length !== 0) {
      profClick();
    }
  }, [modalUserData]);

  return (
    <>
      <Helmet>
        <title> 프로필 페이지 | 온새미로 </title>
      </Helmet>
      
      {/* 유저 프로필 추가 모달 페이지 */}
      <UserAddModal click={ modalUserAdd } close={ close } />

      {/* <UserAnswerModal click={ modalUserAnswer } close={ profClose }  data={modalUserData} userInfo={data} /> */}
      <UserAnswerModal click={modalUserAnswer} close={profClose} data={modalUserData} />

      {/* 메인 페이지 */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          {/* 페이지 상단 제목 */}
          <Typography variant="h4" gutterBottom mt={3}>
            사용자 프로필
          </Typography>
            
          {/* 유저 프로필 추가 버튼 */}
          <Button variant="outlined" onClick={ click } startIcon={<Iconify icon="eva:plus-fill" />} sx={{ position:'relative', top: '10px', fontSize:'18px'}}>
            추가하기
          </Button>
        </Stack>
        
        {/* 유저 프로필 리스트 */}
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid key={index} item xs={12} sm={10} md={4}>
              {/* <UserProfiles data={item} onClick={ getProfileInfo } /> */}
              <UserProfiles data={item} onClick={() => getProfileInfo(item)} />
            </Grid>
          ))}

        </Grid>
      </Container>
    </>
  );
}

