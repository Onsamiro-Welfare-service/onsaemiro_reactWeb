import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const AnswerParentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '170px',
    height: '170px', 
    padding: '10px', 
    backgroundColor: 'white', 
    borderRadius: '5px', 
    textAlign: 'center'
};
const AnswerChildStyle = {
    width:'120px', 
    height:'120px',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '10px'
};
const AnswerImgStyle = {
    width:'100%',
    height:'95%',
    marginTop:'10px',
    
};

PreviewAnswer.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    txt: PropTypes.string
};

export default function PreviewAnswer({ txt, img }) {
    const [fontSize, setFontSize] = useState('25px');

    useEffect(() => {
        const adjustFontSize = () => {
            const maxLength = 6;
            if (txt.length > maxLength) {
                const adjustedSize = Math.max(12, 25 - txt.length); // 비율 조정 필요
                setFontSize(`${adjustedSize}px`);
            } else {
                setFontSize('25px');
            }
        };

        adjustFontSize();
    }, [txt]);

    return (
        <Box sx={AnswerParentStyle}>
            {img !== null && (
                <Box sx={AnswerChildStyle}>
                    <img src={typeof img === "string" ? img : URL.createObjectURL(img)} alt="Description" style={AnswerImgStyle} />
                </Box>
            )}
            <Box sx={{ minHeight: '37.5px', justifyContent:'center' }}>
                <Typography sx={{ fontSize }}>{txt}</Typography>
            </Box>
        </Box>
    );
}
