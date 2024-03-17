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
    width:'100%', 
    height:'80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px'
}
const QuestionImgStyle = { 
    width: '90%', 
    height: '90%', 
    marginTop: 6,
    objectFit: 'contain',
    objectPosition: 'center' 
}


PreviewQuestion.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    txt: PropTypes.string
}

export default function PreviewQuestion({ txt, img }){
    return(
        
        <Box sx={ QuestionParentStyle }>
        { img!==null &&
            <Box sx={ QuestionChildStyle }>
                <img src={typeof img === "string" ? img:URL.createObjectURL(img)} alt="Description" style={ QuestionImgStyle } />
            </Box>
        }
        <Typography variant='h6'>{txt}</Typography>
    </Box>
    );

}