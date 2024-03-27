import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const QuestionParentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '352px', 
    height: '352px',
    padding: '5px', 
    backgroundColor: 'white', 
    borderRadius: '5px',
    textAlign: 'center', 
};

const QuestionChildStyle = {
    width: '100%', 
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15px',
    overflow: 'hidden',
};

const QuestionImgStyle = { 
    width: '320px', 
    height: '320px', 
    marginTop: 6,
    objectFit: 'contain',
    objectPosition: 'center' 
};

PreviewQuestion.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    txt: PropTypes.string,
};

export default function PreviewQuestion({ txt, img }) {
    const [fontSize, setFontSize] = useState('24px');

    useEffect(() => {
        const adjustFontSize = () => { // 길이에 따라 글씨 크기 조정
            const maxLength = 12; 
            if (txt.length > maxLength) {
                const adjustedSize = Math.max(12, 24 - (txt.length/4));
                setFontSize(`${adjustedSize}px`);
            } else {
                setFontSize('24px');
            }
        };
        adjustFontSize();
    }, [txt]);

    return (
        <Box sx={QuestionParentStyle}>
            {img && (
                <Box sx={QuestionChildStyle}>
                    <img src={typeof img === "string" ? img : URL.createObjectURL(img)} alt="Description" style={QuestionImgStyle} />
                </Box>
            )}
            <Typography sx={{ fontSize: `${fontSize}` }}>{txt}</Typography>
        </Box>
    );
}
