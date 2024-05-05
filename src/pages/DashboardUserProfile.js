import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';




import { Grid, Container, Typography, Button, Stack } from '@mui/material';
import Iconify from '../components/iconify';
import { UserProfiles, UserAddModal, UserAnswerModal } from '../sections/@dashboard/userProfile';
import { getRequestApi } from '../apiRequest';
import { API } from '../apiLink';
// import { getCookie } from '../sections/auth/cookie/cookie';


export default function DashboardUserProfile() {
  const navigate = useNavigate();
  const [userProfiles, setUserProfiles] = useState([ // 프로필 리스트
    {
      "id": 0,
      "userName": "로그아웃 해주세요",
      "userAddress": "",
      "userLevel": -1,
      "userBirth": "",
      "imageUrl": "",
      "phoneNumber": ""
    }
  ]);
  const [modalUserAdd, setModalUserAdd] = useState(false);
  const [modalUserAnswer, setModalUserAnswer] = useState(false);
  const [modalUserData, setModalUserData] = useState(null);

  // 프로필 리스트를 불러오는 함수
  const getUserProfiles = useCallback(async () => {
    const cookies = new Cookies();
    const errMsg = 'Error : getUserProfiles';
    const params = { departmentId: cookies.get('departmentId') };
    try {
      
      const accessTkn = await cookies.get('accessToken');
      const refreshTkn = await cookies.get('refreshToken'); // accessTkn, refreshTkn
      const response = await getRequestApi(API.userProfileList, params, errMsg, navigate, accessTkn, refreshTkn);
      if (response.status === 200 && response.data.userList !== undefined) {
        setUserProfiles(response.data.userList);
      } else {
        console.error(errMsg, '지정되지 않은 에러');
      }
    } catch (error) {
      console.error(errMsg, error);
    }
  }, [navigate]);
  
  useEffect(() => {
    const isLogin = () => {
      const cookies = new Cookies();
      const accessTkn = cookies.get("accessToken");
      if (!accessTkn) {
        navigate('/login', { replace: true });
      }
    }
    isLogin();
    getUserProfiles();
  }, [getUserProfiles, navigate]);

  const handleAddModalOpen = () => setModalUserAdd(true);
  const handleAddModalClose = () => setModalUserAdd(false);
  const handleAnswerModalOpen = () => setModalUserAnswer(true);
  const handleAnswerModalClose = () => setModalUserAnswer(false);

  // 프로필 정보를 설정하는 함수
  const getProfileInfo = (item) => {
    // console.log(item);
    setModalUserData(item);
    handleAnswerModalOpen();
  };
  
  return (
    <>
      <Helmet>
        <title> 프로필 관리 | 온새미로</title>
      </Helmet>

      { modalUserAdd && <UserAddModal click={modalUserAdd} close={handleAddModalClose} reload={getUserProfiles}/>}
      { modalUserAnswer && <UserAnswerModal click={modalUserAnswer} close={handleAnswerModalClose} data={modalUserData} reload={getUserProfiles} />}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom mt={3}>
            사용자 프로필
          </Typography>
          <Button variant="outlined" onClick={handleAddModalOpen} startIcon={<Iconify icon="eva:plus-fill" />} sx={{ position: 'relative', top: '10px', fontSize: '18px' }}>
            추가하기
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {userProfiles.map((item, index) => (
            <Grid key={index} item xs={12} sm={10} md={4}>
              <UserProfiles data={{ ...item, id: item.id.toString() }} onClick={() => getProfileInfo(item)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
