// @mui
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
// import { alpha, styled } from '@mui/material/styles';

// icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessibleIcon from '@mui/icons-material/Accessible';


import { Card, Typography, Box, Grid } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

// const StyledIcon = styled('div')(({ theme }) => ({
//   margin: '10px',
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   width: theme.spacing(24),
//   height: theme.spacing(7.5),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(7),
// }));

// ----------------------------------------------------------------------

UserProfiles.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    address: PropTypes.string,
    birth: PropTypes.string,
    phone: PropTypes.string, // This should be a string if it includes hyphens
    level: PropTypes.number,
  }).isRequired,

  color: PropTypes.string,
  sx: PropTypes.object,
  // icon: PropTypes.string,
  // title: PropTypes.string.isRequired,
  // total: PropTypes.number.isRequired,
};

export default function UserProfiles({ color = 'primary', sx, data,...other }) {
  // const name = '김승주';
  // const id = "b1203";
  // const address = "경기도 수원시 영통구 효원로 363";
  // const birth = "1999-10-01";
  // const phone = "010-4151-2489";
  // const level = "중증도 0단계";
  return (
    <Card
      sx={{
        // py: 5,
        boxShadow: 0,
        textAlign: 'left',
        color: '#212B36',
        bgcolor: (theme) => theme.palette[color].lighter,
        borderRadius: '15px',
        ...sx,
        display: 'flex',
        alignItems: 'left',
        padding: '5px'
      }}
      {...other}
    >

      <Avatar sx={{ margin: 3, width: 60, height: 60 }} src="/static/images/avatar/1.jpg" /> 

      <Box sx={{ my: 3 }} md={1}>
        <Grid container alignItems="center">

          <Grid item xs sx={{ mb: 0.5, mt: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {data.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              {data.id}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
          <LocationOnIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2">
            {data.address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
          <CalendarTodayIcon fontSize="small" sx={{mr:1}}/>
          <Typography color="text.secondary" variant="body2">
            {data.birth}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalPhoneIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2">
            {data.phone}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessibleIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2">
            {data.level}
          </Typography>
        </Box>
      </Box>
    </Card>

  );
}