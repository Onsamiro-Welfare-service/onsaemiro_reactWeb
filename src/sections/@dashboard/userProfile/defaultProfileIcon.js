import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
// import ImageSearchIcon from '@mui/icons-material/ImageSearch';

// 파스텔 톤 색상 목록
const pastelColors = ['#ffd6a5', '#ffaaa5', '#ff8b94', '#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5'];



ProfileAvatar.propTypes = {
    profilePhoto: PropTypes.string,
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    sx: PropTypes.object
};

export default function ProfileAvatar({ profilePhoto, id, width, height, sx }) {
    let avatarContent;
    let bgColor;
    const randomPastelColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    
    if (profilePhoto === null) {
      // profilePhoto가 null일 때 어두운 회색 배경과 ImageSearchIcon
      // avatarContent = <HelpOutlineIcon sx={{ width: '50%', height: '50%', color: 'white' }} />;
      // bgColor = randomPastelColor;
      avatarContent = <Avatar sx={{ width: '100%', height: '100%', backgroundColor: randomPastelColor }} id={id} />
    } else if (profilePhoto === 'default') {
      // profilePhoto가 'default'일 때 파스텔 톤 배경과 PersonIcon
      avatarContent = <PersonIcon sx={{ width: '75%', height: '75%', color: 'white' }} id={id} />;
      bgColor = randomPastelColor;
    } else {
      // profilePhoto가 그 외의 값일 때 이미지 표시
      avatarContent = <img src={profilePhoto} alt="profile" style={{ width: '100%', height: '100%' }} id={id} />;
      bgColor = 'transparent';
    }

  return (
    <Avatar
      sx={{
        ...sx,
        width: width || 150,
        height: height || 150,
        bgcolor: bgColor,
      }}
    >
      {avatarContent}
    </Avatar>
  );
}