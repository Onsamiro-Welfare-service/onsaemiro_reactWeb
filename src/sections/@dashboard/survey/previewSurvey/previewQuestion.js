import PropTypes from 'prop-types';

import {
    Box,Typography
} from '@mui/material';

const QuestionParentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '484px', 
    height:'360px',
    padding: '15px', 
    backgroundColor:'white', 
    borderRadius: '20px',
    textAlign:'center', 
}
const QuestionChildStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px'
}
const QuestionImgStyle = { 
    width: '50%', 
    height: '50%', 
    marginTop: 6,
    objectFit: 'contain',
    objectPosition: 'center' 
}


PreviewQuestion.propTypes = {
    txt: PropTypes.string,
    img: PropTypes.string
}

export default function PreviewQuestion({ txt, img }){
    return(
        
        <Box sx={ QuestionParentStyle }>
        { img &&
            <Box sx={ QuestionChildStyle }>
                <img src={img} alt="Description" style={ QuestionImgStyle } />
            </Box>
        }
        <Typography variant='h6'>{txt}</Typography>
    </Box>
    );

}