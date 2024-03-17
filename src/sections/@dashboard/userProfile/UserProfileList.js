// @mui
import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';

// icons
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessibleIcon from '@mui/icons-material/Accessible';
// import RecentActorsIcon from '@mui/icons-material/RecentActors';
// components
import { Card, Typography, Box, Grid } from '@mui/material';

// ----------------------------------------------------------------------
import ProfileAvatar from './defaultProfileIcon';

UserProfiles.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    userName: PropTypes.string,
    userAddress: PropTypes.string,
    userLevel: PropTypes.number,
    userBirth: PropTypes.string,
    imageUrl: PropTypes.string,
    phoneNumber: PropTypes.string, 
  }).isRequired,
  
  color: PropTypes.string,
  sx: PropTypes.object,
};

const CardStyle = {
  textAlign: 'left',
  color: '#212B36',
  bgcolor: 'white',
  boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'left',
  padding: '5px'
};



export default function UserProfiles({ sx, data, ...other }) {

  return (
    <Card 
      id={`${data.userName}_${data.id}`}
      sx={{ ...CardStyle, ...sx }}
      {...other}>

      
      <ProfileAvatar id={`${data.userName}_${data.id}`} profilePhoto={ `${data.imageUrl}0` } width={60} height={60} sx={{ margin:3}}/>
      
      <Box sx={{ my: 3 }} md={1} id={`${data.userName}_${data.id}`}>
        <Grid container >
          {/* <Grid item xs={2} >
              <Typography gutterBottom variant="h5" component="div">
                
              </Typography>
            </Grid> */}
          <Grid item sx={{ mb: 0.5, mt: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {data.userName}
            </Typography>
          </Grid>
          
        </Grid>

        {/* <Box sx={{ display: 'flex', alignItems: 'normal', width:'90%', mb: 1 }}>
          <RecentActorsIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2" sx={{ maxWidth:'200px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}> 
            {data.id}
          </Typography>
        </Box> */}

        <Box sx={{ display: 'flex', alignItems: 'normal', width:'90%', mb: 1 }}>
          <LocationOnIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2" sx={{ maxWidth:'200px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}> 
            {data.userAddress}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
          <CalendarTodayIcon fontSize="small" sx={{mr:1}}/>
          <Typography color="text.secondary" variant="body2">
            {data.userBirth}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalPhoneIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2">
            {data.phoneNumber}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessibleIcon fontSize='small' sx={{mr:1}} />
          <Typography color="text.secondary" variant="body2">
            {data.userLevel}
          </Typography>
        </Box>
      </Box>
    </Card>

  );
}