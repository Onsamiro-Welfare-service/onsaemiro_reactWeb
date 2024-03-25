import PropTypes from 'prop-types';

import React, { useRef, useEffect, useState } from 'react';

import {
    Box,
    Grid,
    Alert,
    Snackbar,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

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
    const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
    const [answerCount, setAnswerCount] = useState(2); // 답변 개수
    const [addAlertSnackbar, setAddAlertSnackbar] = useState(false); // 답변 추가 알림창

    const handleFileChange = (index) => (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (index === -1) {
            // 질문의 파일 변경
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

    const handleAddAnswer = () => {
        if (answerCount < 8){ 
            setAnswerCount(answerCount + 1)
        } else {
            setAddAlertSnackbar(true);
        }
    }

    const handleRemoveAnswer = (index) => {
        const newAnswers = inputs.answers.filter((_, i) => i !== index);
        setInputs({ ...inputs, answers: newAnswers });
        setAnswerCount(answerCount - 1);
    };

    const handleSnackbarClose = () => {
        setAddAlertSnackbar(false);
    };
    
    
    useEffect(() => {
        const updatedAnswers = inputs.answers.slice(0, answerCount); // answers 배열 조절
    
        // 필요한 경우 배열 확장
        while (updatedAnswers.length < answerCount) {
          updatedAnswers.push({ answer: '', imageUrl: null });
        }
    
        setInputs((prevInputs) => ({ ...prevInputs, answers: updatedAnswers }));// eslint-disable-next-line
      }, [inputs.type, inputs.answers.length, answerCount]); 
    
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
                    variant='standard'
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
                <IconButton onClick={() => fileInputRefs.current[0].current.click()} sx={{ display:inputs.userLevel === 1 ? '':'none'}}>
                    {/* <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/> */}
                    {inputs.imageUrl!==null ? (
                        <img src={URL.createObjectURL(inputs.imageUrl)} alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                        ) : (
                        <InsertPhotoOutlinedIcon sx={{ width: '30px', height: '30px'}}/>
                    )}
                </IconButton>
                </Grid>

            {/* 답변 입력 */}
                <Grid item xs={12}>
                    <span style={spanStyle}>답변 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span> 
                    {inputs.answers.map((answer, index) => (
                        <Box key={index+1} sx={{ 
                            display: 'flex',
                            marginTop: 2,
                            '&:hover .answerButton': { 
                                display: 'flex' 
                            }
                        }}>
                            <TextField 
                                variant='standard'
                                label={`답변 ${index + 1}`}
                                sx={{ width: '85%' }}
                                value={answer.description}
                                onChange={handleTextChange(index)}
                            />
                            <input
                                type="file"
                                ref={fileInputRefs.current[index+1]}
                                onChange={handleFileChange(index)}
                                style={{ display: 'none' }}
                            />
                            <IconButton onClick={() => fileInputRefs.current[index+1].current.click()} sx={{ display:inputs.userLevel === 1 ? '':'none'}}>
                                {inputs.answers[index].imageUrl ? (
                                    <img src={URL.createObjectURL(inputs.answers[index].imageUrl)} alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                                    ) : (
                                    <InsertPhotoOutlinedIcon sx={{ width: '30px', height: '30px' }}/>
                                )}
                            </IconButton>

                            <IconButton onClick={() => handleRemoveAnswer(index)} className="answerButton" sx={{ display:'none' }}>
                                <ClearIcon sx={{ width: '20px', height: '20px'}}/>
                            </IconButton>
                        </Box>
                    ))}

                    
                    <Typography onClick={() => handleAddAnswer()} sx={{ cursor:'pointer', color:'#2e63ff', marginTop:'20px', mb: '20px', fontWeight:'bold', textDecoration:'underline' }}>
                        추가하기 {/* <AddToPhotosIcon sx={{ pt:'2px', width: '20px', height: '20px'}}/> */}
                    </Typography>

                    <Snackbar open={addAlertSnackbar} onClose={handleSnackbarClose} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                        <Alert severity="warning">질문 개수가 최대입니다.</Alert>
                    </Snackbar>
                </Grid>     
            </Grid>     
        </Box>
    ); 
}
