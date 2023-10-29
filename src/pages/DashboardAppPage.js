import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker'; 해당 라이브러리는
// @mui
// import { useTheme } from '@mui/material/styles';
import { Container, Typography, Button, Box  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// components
// import Iconify from '../components/iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const modal = () => {
    // 여기에 회원가입 완료 관련 코드 입력
    console.log("버튼 클릭");
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container 
        maxWidth="xl" 
        sx={{
          backgroundColor:"white", 
          padding:"24px",
          borderRadius:"15px"
        }}
         >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back

          <Button sx={{float:"right"}} variant="outlined" startIcon={<AddIcon />} onClick={modal} >
            Add Profile
          </Button>
        </Typography>

        <Box
          sx={{
            backgroundColor:"white",
            width:'100%',
            height:'100%'
          }}
        >첫번째 모달 팝업</Box>

        {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}
        


        <div>두번째 모달 팝업</div>
        
        
      </Container>
    </>
  );
}
