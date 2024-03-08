import PropTypes from 'prop-types';

import {
    Box,Typography
} from '@mui/material';

const AnswerParentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
    height: '245px', 
    padding: '10px', 
    backgroundColor: 'white', 
    borderRadius: '20px', 
    textAlign: 'center'
}
const AnswerChildStyle = {
    width:'100%', 
    height:'80%',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '10px'
}
const AnswerImgStyle = {
    width: '70%', 
    height: '70%', 
    marginTop: 6, 
    objectFit:'contain',
    objectPosition:'center'
}

PreviewAnswer.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    txt: PropTypes.string
}

export default function PreviewAnswer({ txt, img }){
    return(
        // Todo: 만약 img값이 있다면 아래와 같이 이미지를 출력하고 없다면 이미지가 없느 상태로 출력합니다.
        <Box sx={ AnswerParentStyle }>
             
            { img!==null &&
                <Box sx={ AnswerChildStyle }>
                    <img src={typeof img === "string" ? img:URL.createObjectURL(img)} alt="Description" style={ AnswerImgStyle } />
                </Box>
            }
            <Typography variant='h6'>{txt}</Typography>
        </Box>
    );
}