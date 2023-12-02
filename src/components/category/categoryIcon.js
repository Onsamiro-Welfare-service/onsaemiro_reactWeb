import PropTypes from 'prop-types';

import { Box } from '@mui/material';

CategoryIcon.propTypes = {
    category: PropTypes.string,
}





export default function CategoryIcon({category}){
    return(
        <>
        <Box sx={{
                width:'60px',
                height:'40px',
                border:'2px solid black',
                color:'black',
                fontWeight:'bold',
                fontSize:'20px',
                borderRadius:'10px',
                textAlign:'center',
                paddingTop:'4px',
                mb:'15px'
            }}>{category}</Box>
        </>
    );
}