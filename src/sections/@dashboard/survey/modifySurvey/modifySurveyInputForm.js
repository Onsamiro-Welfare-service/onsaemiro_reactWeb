import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, IconButton, Snackbar, Alert } from '@mui/material';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    const [fileInputRefs, setFileInputRefs] = useState([React.createRef(), React.createRef(), React.createRef()]);
    const [answerCount, setAnswerCount] = useState(inputs.answerList.length); // 답변 개수
    const [addAlertSnackbar, setAddAlertSnackbar] = useState(false); // 답변 추가 알림창

    const handleFileChange = (index) => (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        if (index === -1) { // 질문의 파일 변경
            setInputs({ ...inputs, imageUrl: file });
        } else {// 답변의 파일 변경
            const newAnswers = [...inputs.answerList];
            newAnswers[index].imageUrl = file;
            setInputs({ ...inputs, answerList: newAnswers });
        }
    };

    const handleDeleteFile = (index) => () => {
        if (index === -1) { // 질문의 파일 삭제
            setInputs({ ...inputs, imageUrl: null });
        } else { // 답변의 파일 삭제
            const newAnswers = [...inputs.answerList];
            newAnswers[index].imageUrl = '';
            setInputs({ ...inputs, answerList: newAnswers });
        }
    };


    const handleTextChange = (index) => (event) => {
        const newText = event.target.value;
        if (index === -1) {
            // 질문의 텍스트 변경
            setInputs({ ...inputs, question: newText });
        } else {
            // 답변의 텍스트 변경
            const newAnswers = [...inputs.answerList];
            newAnswers[index].description = newText;
            setInputs({ ...inputs, answerList: newAnswers });
        }
    };

    // const handleAddAnswer = () => {
    //     if (answerCount < 8){ 
    //         setAnswerCount(answerCount + 1)
    //         setFileInputRefs([...fileInputRefs, React.createRef()]);
    //     } else {
    //         setAddAlertSnackbar(true);
    //     }
    // }

    const handleRemoveAnswer = (index) => {
        const newAnswers = inputs.answerList.filter((_, i) => i !== index);
        setInputs({ ...inputs, answers: newAnswers });
        setAnswerCount(answerCount - 1);

        if (answerCount > 2){
            const newFileInputRefs = fileInputRefs.filter((_, i) => i !== index+1);
            setFileInputRefs(newFileInputRefs);
        }
    };

    const handleSnackbarClose = () => {
        setAddAlertSnackbar(false);
    };
    
    useEffect(() => {
        const updatedAnswers = inputs.answerList.slice(0, answerCount);
        // 필요한 경우 배열 확장
        while (updatedAnswers.length < answerCount) {
          updatedAnswers.push({ description: '', imageUrl: null });
        }
    
        setInputs((prevInputs) => ({ ...prevInputs, answerList: updatedAnswers }));// eslint-disable-next-line
      }, [inputs.type, inputs.answerList.length, answerCount]); 
    
    return (
        <Box sx={{
            height: '430px',
            overflowY: 'auto',
            '&:: -webkit-scrollbar':{
                display: 'none'
            },
            borderBottom:'2px solid lightgray',
            
        }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <span style={spanStyle}>질문 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span>
                    <TextField
                        variant='standard'
                        label='질문'
                        sx={{ width: '85%' }}
                        value={inputs.question}
                        onChange={handleTextChange(-1)}
                    />
                    <input
                        type="file"
                        ref={fileInputRefs[0]}
                        onChange={handleFileChange(-1)}
                        style={{ display: 'none' }}
                    />
                    { inputs.level === 1 &&
                     <IconButton onClick={() => fileInputRefs[0].current.click()}>
                        {inputs.imageUrl ? (
                                <img src={typeof inputs.imageUrl === 'string' ? inputs.imageUrl:URL.createObjectURL(inputs.imageUrl) } alt="Description" style={{ width: 30, height: 30, marginTop: 6 }} />
                                ) : (
                                <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                            )}
                    </IconButton>}
                    {inputs.imageUrl && (
                        <IconButton sx={{ position: 'relative', left:'-5px', top:'2px', color:  'black' }} onClick={handleDeleteFile(-1)}>
                            <DeleteOutlineIcon sx={{ fontSize: '15px'}} />
                        </IconButton>
                    )}

                </Grid>

            {/* 답변 입력 */}
                <Grid item xs={12}>
                    <span style={spanStyle}>답변 내용</span> 
                    <span style={{...spanStyle, fontSize:'12px'}}>*필수입력 사항입니다.</span> 
                    <Box sx={{ 
                        maxHeight:'220px', 
                        overflowY:'auto',
                        '&:: -webkit-scrollbar':{
                            display: 'none'
                        },
                    }}>
                    {inputs.answerList.map((answer, index) => (
                        <Box key={index+1} sx={{
                            mt:2, 
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover .answerButton': { 
                                display: 'flex' 
                            },
                            
                        }}>
                            <TextField 
                                variant='standard'
                                label={`답변 ${index + 1}`}
                                sx={{ width: '95%' }}
                                value={answer.description}
                                onChange={handleTextChange(index)}
                            />
                            <input
                                type="file"
                                ref={fileInputRefs[index+1]}
                                onChange={handleFileChange(index)}
                                style={{ display: 'none' }}
                            />
                            { inputs.level === 1 &&
                            <IconButton onClick={() => fileInputRefs[index+1].current.click()}>
                                {inputs.answerList[index].imageUrl ? (
                                    <img 
                                        src={typeof inputs.answerList[index].imageUrl === "string" ? inputs.answerList[index].imageUrl: URL.createObjectURL(inputs.answerList[index].imageUrl)} 
                                        alt="Description" 
                                        style={{ width: 30, height: 30, marginTop: 6 }} />
                                    ) : (
                                    <AddPhotoAlternateIcon sx={{ width: '30px', height: '30px'}}/>
                                )}
                            </IconButton>}

                            {inputs.answerList[index].imageUrl &&
                                <IconButton sx={{ position: 'relative', left:'-5px', top:'2px', color:  'black' }} 
                                    onClick={() => {
                                        const newAnswers = [...inputs.answerList];
                                        newAnswers[index].imageUrl = '';
                                        setInputs({ ...inputs, answerList: newAnswers });}}>
                                    <DeleteOutlineIcon sx={{ fontSize: '15px'}} />
                                </IconButton>
                            }

                            <IconButton onClick={() => handleRemoveAnswer(index)}  sx={{ display:'none' }}>{/* className="answerButton" */}
                                <CloseIcon sx={{ width: '20px', height: '20px'}}/>
                            </IconButton>
                        </Box>
                    ))}

                    {/* <Typography onClick={() => handleAddAnswer()} sx={{ cursor:'pointer', color:'#2e63ff', marginTop:'20px', mb: '20px', fontWeight:'bold', textDecoration:'underline' }}>
                        추가하기 
                    </Typography> */}
                    <Snackbar open={addAlertSnackbar} onClose={handleSnackbarClose} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                        <Alert severity="warning">질문 개수가 최대입니다.</Alert>
                    </Snackbar>
                    </Box>
                </Grid>     
            </Grid>     
        </Box>
    ); 
}
