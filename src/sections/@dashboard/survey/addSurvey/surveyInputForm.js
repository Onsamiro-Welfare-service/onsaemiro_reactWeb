import PropTypes from 'prop-types';

import React, { useRef,useEffect } from 'react';

import {
    Box,
    Grid,
    IconButton,
    TextField,
} from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const spanStyle = {
    fontSize: '18px', 
    fontWeight:'bold', 
    lineHeight:'2.7', 
    marginRight:'20px'
}

SurveyInputForm.propTypes = {
    inputs: PropTypes.object,
    setInputs: PropTypes.func,
}

export default function SurveyInputForm({inputs, setInputs}) {    
    const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleFileChange = (index) => (event) => {
        console.log(index);
        const file = event.target.files[0];
        if (!file) return;
        console.log(file);
        // const fileUrl = URL.createObjectURL(file);
        if (index === -1) {
            // 질문의 파일 변경
            // console.log(file);
            setInputs({ ...inputs, imageUrl: file });
        } else {
            // 답변의 파일 변경
            const newAnswers = [...inputs.answers];
            newAnswers[index].imageUrl = file;
            setInputs({ ...inputs, answers: newAnswers });
        }
    };

    const handleTextChange = (index) => (event) => {
        const newText = event.target.value;
        if (index === -1) {
            // 질문의 텍스트 변경
            setInputs({ ...inputs, question: newText });
        } else {
            // 답변의 텍스트 변경
            const newAnswers = [...inputs.answers];
            newAnswers[index].answer = newText;
            setInputs({ ...inputs, answers: newAnswers });
        }
    };
    
    useEffect(() => {
        let count;
        // console.log(inputs.type);
        switch(inputs.type){ 
            case 1: count = 2; break;
            case 2: count = 3; break;
            case 3: count = 4; break;
            default: ;
        }
        const updatedAnswers = inputs.answers.slice(0, count); // answers 배열 조절
    
        // 필요한 경우 배열 확장
        while (updatedAnswers.length < count) {
          updatedAnswers.push({ answer: '', imageUrl: null });
        }
    
        setInputs((prevInputs) => ({ ...prevInputs, answers: updatedAnswers }));// eslint-disable-next-line
      }, [inputs.type, inputs.answers.length]); 
    
    return (
        <Box sx={{
            height: '370px',
            overflow: 'auto',
            '&:: -webkit-scrollbar':{
                display: 'none'
            },
            
            borderBottom:'2px solid lightgray'
        }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <span style={spanStyle}>질문 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span>
                <TextField
                    variant='outlined'
                    label='질문'
                    sx={{ width: '90%' }}
                    value={inputs.question}
                    onChange={handleTextChange(-1)}
                />
                <input
                    type="file"
                    ref={fileInputRefs.current[0]}
                    onChange={handleFileChange(-1)}
                    style={{ display: 'none' }}
                />
                <IconButton onClick={() => fileInputRefs.current[0].current.click()}>
                    {/* <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/> */}
                    {inputs.imageUrl!==null ? (
                            <img src={URL.createObjectURL(inputs.imageUrl)} alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                            ) : (
                            <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                        )}
                </IconButton>
                </Grid>

            {/* 답변 입력 */}
                <Grid item xs={12}>
                    <span style={spanStyle}>답변 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span> 
                    {inputs.answers.map((answer, index) => (
                        <Box key={index+1} mt={2}>
                            <TextField 
                                variant='outlined'
                                label={`답변 ${index + 1}`}
                                sx={{ width: '90%' }}
                                value={answer.description}
                                onChange={handleTextChange(index)}
                            />
                            <input
                                type="file"
                                ref={fileInputRefs.current[index+1]}
                                onChange={handleFileChange(index)}
                                style={{ display: 'none' }}
                            />
                            <IconButton onClick={() => fileInputRefs.current[index+1].current.click()}>
                                {inputs.answers[index].imageUrl ? (
                                    <img src={URL.createObjectURL(inputs.answers[index].imageUrl)} alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                                    ) : (
                                    <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                                )}
                            </IconButton>
                        </Box>
                    ))}
                </Grid>     
            </Grid>     
        </Box>
    ); 
}
