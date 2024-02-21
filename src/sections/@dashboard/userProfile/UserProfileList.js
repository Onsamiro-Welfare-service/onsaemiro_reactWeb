// @mui
import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';

// icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessibleIcon from '@mui/icons-material/Accessible';

// components
import { Card, Typography, Box, Grid } from '@mui/material';

// ----------------------------------------------------------------------
import ProfileAvatar from './defaultProfileIcon';

UserProfiles.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    address: PropTypes.string,
    birth: PropTypes.string,
    phone: PropTypes.string, 
    level: PropTypes.number,
    
  }).isRequired,
  images: PropTypes.string,
  color: PropTypes.string,
  sx: PropTypes.object,

};


export default function UserProfiles({ sx, data, images=null, ...other }) {
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
        textAlign: 'left',
        color: '#212B36',
        bgcolor: 'white',
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        ...sx,
        display: 'flex',
        alignItems: 'left',
        padding: '5px'
      }}
      {...other}
      id={`${data.name}_${data.id}`}
      
    >

      
      <ProfileAvatar id={`${data.name}_${data.id}`} profilePhoto={ images } width={60} height={60} sx={{ margin:3}}/>
      
      <Box sx={{ my: 3 }} md={1} id={`${data.name}_${data.id}`}>
        <Grid container alignItems="center">

          <Grid item xs sx={{ mb: 0.5, mt: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {data.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
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